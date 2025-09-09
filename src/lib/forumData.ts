// Mock forum discussions data based on real governance forums
// In production, this would fetch from actual forum APIs

export interface ForumDiscussion {
  id: string;
  title: string;
  url: string;
  protocol: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
  author: string;
  isHot: boolean;
}

export function generateMockForumDiscussions(): ForumDiscussion[] {
  const discussions: ForumDiscussion[] = [
    // AAVE Discussions
    {
      id: 'aave-1',
      title: 'Aave V3 Multi-Chain Strategy: Expanding to Base and Optimism',
      url: 'https://governance.aave.com/t/aave-v3-multi-chain-strategy/12345',
      protocol: 'Aave',
      replies: 89,
      views: 2156,
      lastActivity: '2 hours ago',
      category: 'Governance',
      author: 'AaveLabs',
      isHot: true,
    },
    {
      id: 'aave-2',
      title: 'Proposal: Increase USDC Supply Cap on Ethereum V3',
      url: 'https://governance.aave.com/t/increase-usdc-supply-cap/12346',
      protocol: 'Aave',
      replies: 156,
      views: 3421,
      lastActivity: '5 hours ago',
      category: 'Proposal',
      author: 'DeFiWhale',
      isHot: true,
    },
    {
      id: 'aave-3',
      title: 'Risk Parameters Update: WETH Interest Rate Strategy',
      url: 'https://governance.aave.com/t/weth-interest-rate-strategy/12347',
      protocol: 'Aave',
      replies: 67,
      views: 1890,
      lastActivity: '1 day ago',
      category: 'Risk',
      author: 'RiskCommittee',
      isHot: false,
    },

    // Ethena Discussions
    {
      id: 'ethena-1',
      title:
        'Ethena Allocation Assessment: Backing assets into Morpho (Steakhouse Vaults)',
      url: 'https://gov.ethenafoundation.com/t/ethena-allocation-assessment-backing-assets-into-morpho-steakhouse-vaults/684',
      protocol: 'Ethena',
      replies: 234,
      views: 4567,
      lastActivity: '3 hours ago',
      category: 'Allocation',
      author: 'muntangled',
      isHot: true,
    },
    {
      id: 'ethena-2',
      title: 'Ethena Backing Asset Framework',
      url: 'https://gov.ethenafoundation.com/t/ethena-backing-asset-framework/683',
      protocol: 'Ethena',
      replies: 189,
      views: 3890,
      lastActivity: '6 hours ago',
      category: 'Framework',
      author: 'quntangled',
      isHot: true,
    },
    {
      id: 'ethena-3',
      title: 'ENA Fee Switch Parameters Discussion',
      url: 'https://gov.ethenafoundation.com/t/ena-fee-switch-parameters/396',
      protocol: 'Ethena',
      replies: 145,
      views: 2987,
      lastActivity: '1 day ago',
      category: 'Economics',
      author: 'EthenaLabs_Research',
      isHot: false,
    },

    // Uniswap Discussions
    {
      id: 'uniswap-1',
      title: 'GLI — Incentivized Delegation Vaults',
      url: 'https://gov.uniswap.org/t/gli-incentivized-delegation-vaults/25811',
      protocol: 'Uniswap',
      replies: 312,
      views: 6789,
      lastActivity: '4 hours ago',
      category: 'Governance',
      author: 'Event Horizon',
      isHot: true,
    },
    {
      id: 'uniswap-2',
      title: 'Launching Uniswap v3 on Ronin with co-incentives',
      url: 'https://gov.uniswap.org/t/launching-uniswap-v3-on-ronin/25810',
      protocol: 'Uniswap',
      replies: 198,
      views: 4321,
      lastActivity: '8 hours ago',
      category: 'Expansion',
      author: 'Sky Mavis',
      isHot: true,
    },
    {
      id: 'uniswap-3',
      title: 'Establish Uniswap Governance as "DUNI," a Wyoming DUNA',
      url: 'https://gov.uniswap.org/t/establish-uniswap-governance-as-duni/25809',
      protocol: 'Uniswap',
      replies: 267,
      views: 5432,
      lastActivity: '2 days ago',
      category: 'Legal',
      author: 'Uniswap Foundation',
      isHot: false,
    },

    // Morpho Discussions
    {
      id: 'morpho-1',
      title: 'Morpho Blue: Next-Generation Lending Protocol Architecture',
      url: 'https://gov.morpho.xyz/t/morpho-blue-architecture/1234',
      protocol: 'Morpho',
      replies: 178,
      views: 3456,
      lastActivity: '5 hours ago',
      category: 'Protocol',
      author: 'Morpho Labs',
      isHot: true,
    },
    {
      id: 'morpho-2',
      title: 'Risk Parameters Update: ETH Market Configuration',
      url: 'https://gov.morpho.xyz/t/eth-market-configuration/1235',
      protocol: 'Morpho',
      replies: 89,
      views: 2134,
      lastActivity: '1 day ago',
      category: 'Risk',
      author: 'Risk Team',
      isHot: false,
    },

    // Gearbox Discussions
    {
      id: 'gearbox-1',
      title: 'Gearbox V3: Leveraged DeFi Strategy Framework',
      url: 'https://gov.gearbox.fi/t/gearbox-v3-framework/5678',
      protocol: 'Gearbox',
      replies: 145,
      views: 2876,
      lastActivity: '6 hours ago',
      category: 'Protocol',
      author: 'Gearbox Labs',
      isHot: true,
    },
    {
      id: 'gearbox-2',
      title: 'New Asset Support: Adding USDC and WETH Markets',
      url: 'https://gov.gearbox.fi/t/new-asset-support/5679',
      protocol: 'Gearbox',
      replies: 67,
      views: 1567,
      lastActivity: '2 days ago',
      category: 'Assets',
      author: 'Community',
      isHot: false,
    },

    // Pendle Discussions
    {
      id: 'pendle-1',
      title: 'Pendle V3: Enhanced Yield Trading Infrastructure',
      url: 'https://gov.pendle.finance/t/pendle-v3-infrastructure/9012',
      protocol: 'Pendle',
      replies: 123,
      views: 2345,
      lastActivity: '7 hours ago',
      category: 'Protocol',
      author: 'Pendle Labs',
      isHot: true,
    },
    {
      id: 'pendle-2',
      title: 'New Market Launch: stETH Yield Tokens',
      url: 'https://gov.pendle.finance/t/steth-yield-tokens/9013',
      protocol: 'Pendle',
      replies: 78,
      views: 1890,
      lastActivity: '3 days ago',
      category: 'Markets',
      author: 'Market Team',
      isHot: false,
    },

    // Curve Discussions
    {
      id: 'curve-1',
      title: 'Curve V2: Concentrated Liquidity Implementation',
      url: 'https://gov.curve.fi/t/curve-v2-concentrated-liquidity/3456',
      protocol: 'Curve',
      replies: 234,
      views: 4567,
      lastActivity: '4 hours ago',
      category: 'Protocol',
      author: 'Curve Labs',
      isHot: true,
    },
    {
      id: 'curve-2',
      title: 'New Pool: USDC/USDT/DAI Tri-Pool Configuration',
      url: 'https://gov.curve.fi/t/usdc-usdt-dai-tri-pool/3457',
      protocol: 'Curve',
      replies: 156,
      views: 3123,
      lastActivity: '1 day ago',
      category: 'Pools',
      author: 'Pool Manager',
      isHot: false,
    },
  ];

  return discussions;
}
