import StyleDictionary from 'style-dictionary';

const dictionary = new StyleDictionary({
  source: ['tokens/**/*.json'],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'kofa',
      buildPath: 'src/styles/generated/',
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
