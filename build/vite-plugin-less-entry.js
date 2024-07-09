import path from "node:path";
import fs from "fs-extra";

const name = "vite-plugin-custom-less-entry";
export const formatConsole = msg => `[${name}] ${msg}`;
/**
 * 生成项目less的入口文件
 */
export default function lessEntryPlugin({ entry, libPath, name }) {
  let outputed = false;
  let rootConfig = null;
  return {
    name,
    apply: "build",
    order: "post",

    configResolved(config) {
      rootConfig = config;
    },

    writeBundle() {
      if (outputed) {
        return;
      }
      outputed = true;

      // 遍历entry下的index.less文件，生成${name}.less文件
      const componentsPath = path.join(rootConfig.root, entry);

      let componentsLessContent = "";
      fs.readdir(componentsPath, (err, files) => {
        files.forEach(file => {
          if (fs.existsSync(path.join(componentsPath, file, "index.less"))) {
            componentsLessContent += `@import "./${libPath}/${path.posix.join(
              file,
              "index.less"
            )}";\n`;
          }
        });

        const lessEntryFile = path.join(
          rootConfig.root,
          rootConfig.build.outDir,
          `${name}.less`
        );
        fs.outputFile(lessEntryFile, componentsLessContent, err => {
          if (err) {
            console.error(formatConsole("Failed to generate less entry file"));
          } else {
            console.info(
              formatConsole("Successfully generated less entry file")
            );
          }
        });
      });
    },
  };
}
