export async function getFAQData() {
  // In a real application, you would fetch this data from an API or database
  return [
    {
      question: 'What is yield farming?',
      answer:
        'Yield farming is a method of earning rewards with cryptocurrency holdings using permissionless liquidity protocols.',
    },
    {
      question: 'How is APY calculated?',
      answer:
        'APY (Annual Percentage Yield) is calculated based on the assumption that the interest is compounded and reinvested over a year.',
    },
    {
      question: 'What is TVL?',
      answer:
        'TVL stands for Total Value Locked. It represents the total amount of assets that are currently being staked in a specific protocol.',
    },
    // Add more FAQ items as needed
  ];
}
