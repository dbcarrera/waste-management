export interface StatisticsReport {
  pickupsByType: {
    paper: number;
    glass: number;
    organic: number;
    plastic: number;
  };
  issuesByType: {
    'missed pickup': number;
    bug: number;
    other: number;
  };
}
