import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const dictionary = new StyleDictionary({
  source: [
    fileURLToPath(new URL('../tokens/**/*.json', import.meta.url)),
    fileURLToPath(new URL('../packages/web/tokens/**/*.json', import.meta.url)),
  ],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'kofa',
      buildPath: fileURLToPath(
        new URL('../packages/web/src/styles/generated/', import.meta.url),
      ),
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
  },
});

await dictionary.cleanAllPlatforms();
await dictionary.buildAllPlatforms();
