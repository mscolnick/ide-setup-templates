import { Command } from 'commander';
import { copyTemplate } from './core/copy';

const program = new Command();

interface ProgramOpts {
  monorepoDir: string;
  templateDir: string;
  destinationDir: string;
}

program
  .requiredOption('--monorepo-dir', 'Monorepo root directory')
  .requiredOption('--template-dir', 'Template root directory')
  .requiredOption('--destination-dir', 'Destination root directory')
  .parse();

const options = program.opts<ProgramOpts>();

copyTemplate(options);
