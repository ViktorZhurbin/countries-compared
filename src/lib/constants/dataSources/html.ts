import type { HtmlDataSource } from './types';

export enum HtmlDataSourceCode {
	Safety = 'safety_index',
	HDI = 'human_development_index',
	Governance = 'governance'
}

export const htmlDataSources: Record<HtmlDataSourceCode, HtmlDataSource> = {
	[HtmlDataSourceCode.HDI]: {
		code: HtmlDataSourceCode.HDI,
		name: 'Human Development Index',
		tableSelector: 'h2:has(#List) ~ table',
		url: 'https://en.wikipedia.org/wiki/List_of_countries_by_inequality-adjusted_Human_Development_Index'
	},
	[HtmlDataSourceCode.Safety]: {
		code: HtmlDataSourceCode.Safety,
		name: 'Safety Index',
		tableSelector: '#t2',
		url: 'https://www.numbeo.com/crime/rankings_by_country.jsp?title=2023-mid&displayColumn=1'
	},
	[HtmlDataSourceCode.Governance]: {
		code: HtmlDataSourceCode.Governance,
		name: 'Global Governance Index',
		tableSelector: 'table.tablepress',
		url: 'https://solability.com/the-global-sustainable-competitiveness-index/the-index/governance-capital'
	}
};
