# Cruise Keyword Tracking Spreadsheets

Generated: 2025-09-23T17:21:00.248Z

## Files Generated

1. **cruise-keyword-tracking.csv**
   - Main keyword tracking spreadsheet
   - 40 keywords across all categories
   - Track positions, impressions, clicks, and CTR

2. **weekly-performance-tracking.csv**
   - 12-week performance tracking template
   - Monitor progress over time
   - Track ranking distribution

3. **competitor-tracking.csv**
   - Compare rankings with competitors
   - Identify opportunities
   - Track competitive gaps

4. **tracking-summary.json**
   - Programmatic access to tracking data
   - Category and priority breakdowns
   - Target page mapping

## How to Use

### Google Sheets Setup

1. **Import CSV Files**:
   - Open Google Sheets
   - File > Import > Upload
   - Select the CSV file
   - Choose "Replace spreadsheet"

2. **Set Up Formulas**:
   - Position Change: =C2-D2 (Current - Previous)
   - CTR: =H2/G2\*100 (Clicks/Impressions)
   - Opportunity Score: Based on volume and current position

3. **Create Charts**:
   - Position trends over time
   - CTR by keyword category
   - Traffic growth charts

### Update Schedule

- **Daily**: Check positions for primary keywords
- **Weekly**: Full position update and report
- **Monthly**: Comprehensive analysis and strategy review

## Tracking Guidelines

### Priority Levels

- **High**: Primary and local keywords - check daily
- **Medium**: Secondary keywords - check 2-3x per week
- **Low**: Long-tail keywords - check weekly

### Status Definitions

- **Tracking**: Newly added, establishing baseline
- **Improving**: Position improving over last 7 days
- **Declining**: Position declining, needs attention
- **Stable**: Position steady (+/- 2 positions)

### Action Items by Position

- **Not ranking (>100)**: Content creation needed
- **51-100**: On-page optimization required
- **21-50**: Link building and content enhancement
- **11-20**: Technical SEO and user signals
- **6-10**: Final push with CTR optimization
- **1-5**: Maintain and defend position

## Data Sources

### Manual Updates

1. **Google Search Console**:
   - Performance > Search results
   - Filter by page or query
   - Export data

2. **Third-Party Tools**:
   - SEMrush position tracking
   - Ahrefs rank tracker
   - Moz Pro campaigns

### Automated Updates

Consider using:

- Google Search Console API
- SEMrush API
- Custom tracking scripts

## Reporting

### Weekly Report Format

```
Week of: [Date]

Summary:
- Keywords in top 10: X/Y
- Average position change: +/- X
- Total impressions: X,XXX
- Total clicks: XXX

Improvements:
- [Keyword]: Position X → Y

Needs Attention:
- [Keyword]: Position X → Y

Next Week Focus:
- [Action items]
```

## Notes

- Baseline positions captured before Phase 1 launch
- Track both desktop and mobile positions
- Consider local pack rankings separately
- Monitor featured snippets opportunities

---

For questions or updates, contact the SEO team.
