// lib/api.js

export async function fetchProjects() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects'
    );
    if (!res.ok) throw new Error('Failed to fetch projects');

    const data = await res.json();
    console.log('Fetched projects:', data); // Add this line
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}

export async function yieldRates() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
    );
    if (!res.ok) throw new Error('Failed to fetch yield rates');
    return await res.json();
  } catch (error) {
    console.error('Error fetching yield rates:', error);
    throw error;
  }
}

export async function yieldRatesStablecoin() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/stablecoin_yield_rates'
    );
    if (!res.ok) throw new Error('Failed to fetch stablecoin yield rates');
    return await res.json();
  } catch (error) {
    console.error('Error fetching stablecoin yield rates:', error);
    throw error;
  }
}
