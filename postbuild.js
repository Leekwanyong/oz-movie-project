import * as fs from 'node:fs';

const readFile = fs.readFileSync('dist/index.html').toString().trim();
const regex = /<link[^>]*rel=["']stylesheet["'][^>]*>/g;
const readFileMatch = readFile.match(regex);
let modifiedHtml = readFile;

for (let i = 0; i < readFileMatch.length; i++) {
  const fileData = readFileMatch[i];
  const media2 = fileData.includes('media=');
  const onload = fileData.includes('onload=');

  if (!media2 || !onload) {
    const tagWithoutBracket  = fileData.slice(0, -1);
    const newAttributes  = 'media="print" onload="this.media=\'all\'"';
    const updatedLinkTag = tagWithoutBracket + newAttributes + '>';
    modifiedHtml = modifiedHtml.replace(fileData, updatedLinkTag);
  }
}

modifiedHtml = modifiedHtml.replace(
  '</head>',
  `<style>
    html, body, #root {
      max-width: 1860px;
      margin: 0 auto;
      padding: 0;
      height: 100%;
    }
  </style></head>`
);

fs.writeFileSync('dist/index.html', modifiedHtml);