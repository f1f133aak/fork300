#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { Command } from 'commander';

import Cli from './components/cli/Cli';
import { LogsProvider } from './context/logs';

const program = new Command();

program
  .name('cxo-relay-cli')
  .description('CXO relay CLI utility')
  .version('0.0.1')
  .requiredOption(
    '--key <keyOrMnemonic>',
    'The private key or mnemonic phrase for the wallet that holds MATIC that will be spent to relay transactions'
  )
  .requiredOption(
    '--relayUrl <url>',
    'The URL of the API endpoint to retrieve relay data'
  )
  .requiredOption('--rpcUrl <url>', 'The Polygon node RPC URL')
  .requiredOption(
    '--rewardAddr <address>',
    'The address where CXO are stored on the Polygon network (and where the reward will be sent to)'
  )
  .option('--gas <price>', 'Custom gas price');

program.parse();
const options = program.opts();

render(
  <LogsProvider forwardToConsole={false} tailSize={30}>
    <Cli
      privateKeyOrMnemonic={options['key']}
      relayUrl={options['relayUrl']}
      rpcAddress={options['rpcUrl']}
      rewardCxoAddress={options['rewardAddr']}
      gasPrice={options['gas']}
    />
  </LogsProvider>
);
