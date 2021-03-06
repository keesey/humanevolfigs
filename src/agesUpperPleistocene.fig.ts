/// <reference path="ageFigure.ts"/>

var FIGURE_WIDTH = 1000;

var TAXA: AgeFigureTaxon[] = [
	{
		name: 'orangutans',
		silhouette: 'assets/silhouettes/Pongo abelii.svg'
	},
	{
		name: 'Floresian \"hobbits\"',
		label: 'Floresian \u201cHobbits\u201d',
		silhouette: 'assets/silhouettes/Homo floresiensis.svg'
	},
	{
		name: 'archaics',
		silhouette: 'assets/silhouettes/Homo neanderthalensis (male).svg'
	},
	{
		name: 'humans',
		silhouette: 'assets/silhouettes/Homo sapiens sapiens (female, walking).svg'
	}
];

var FIGURE_HEIGHT = ageFigureHeight(FIGURE_WIDTH, TAXA.length);

var FIGURE_TO_RENDER: Haeckel.Figure = 
{
	width: FIGURE_WIDTH,
	height: FIGURE_HEIGHT,
	sources: ['data/2014 - ICS.json', 'data/compiled/characters.json', 'data/compiled/nomenclature.json'],
	assets: {
		//png: ['assets/worldmap_popdensity.png'],
		svg: ['assets/worldmap.svg'].concat(TAXA.map(taxon => taxon.silhouette))
	},
	render: (builder: Haeckel.ElementBuilder, sources: Haeckel.DataSources, defs: () => Haeckel.ElementBuilder) =>
	{
		var area = Haeckel.rec.create(0, 0, FIGURE_WIDTH, FIGURE_HEIGHT);
		ageFigure({
			area: area,
			builder: builder,
			defs: defs(),
			nomenclature: sources.nomenclature,
			occurrencesSource: sources.sources['data/compiled/characters.json'],
			strataSource: sources.sources['data/2014 - ICS.json'],
			taxa: TAXA,
			timeUnitName: 'Upper Pleistocene'
		});
		return builder;
	}
};