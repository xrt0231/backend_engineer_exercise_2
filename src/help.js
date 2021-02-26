import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('alexa [command] <options>')}
  ${chalk.blueBright('top')} ................ show top <number> sites URL on www.alexa.com/topsites
  ${chalk.blueBright('country')} ........... show top 20 sites URL on www.alexa.com/topsites
`,

  top: `//...
        `,
  country: `//...
        `,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}