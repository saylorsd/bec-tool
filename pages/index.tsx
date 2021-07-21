// noinspection SqlResolve

import {useState} from 'react';
import '@wprdc/test-components/src/styles/global.css'

import {
  ConnectedDataViz,
  ConnectedGeographySection,
  DataVizType,
  DataVizVariant,
  Divider,
  GeogIdentifier,
  GeographyType, GeogTypeDescriptor,
  LayerPanelVariant,
  Map,
  MapProps
} from '@wprdc/test-components';

export default function Home() {
  const [fresh, setFresh] = useState<boolean>(true);
  const [geog, setGeog] = useState<GeogIdentifier>();

  const dataViz = {
    id: 39,
    name: 'Median Age',
    slug: 'median-age',
    vizType: DataVizType.BigValue,
    description: '',
    staticOptions: {},
  };
  const dataViz2 = {
    "id": 34,
    "name": "Health Insurance Coverage",
    "slug": "health-insurance-coverage-table",
    "vizType": DataVizType.Table,
    "description": "Number and percent of civilian non-institutionalized population with health insurance coverage",
    "staticOptions": {},
  };

  const assetTypes = [
    {
      name: 'nursing_homes',
      title: 'Nursing Homes',
    },
    {
      name: 'veterans_social_orgs',
      title: "Veteran's Social Orgs",
    },
    {
      name: 'va_facilities',
      title: 'VA Facilities',
    },
    {
      name: 'public_buildings',
      title: 'Public Buildings',
    },
    {
      name: 'schools',
      title: 'Schools',
    },
    {
      name: 'health_centers',
      title: 'Health Centers',
    },
    {
      name: 'rec_centers',
      title: 'Rec Centers',
    },
    {
      name: 'museums',
      title: 'Museums',
    },
  ];

  const handleClick: MapProps["onClick"] = (e, extras) => {
    if (fresh) setFresh(false);
    if (!!extras && !!extras.menuGeog) {
      setGeog(extras.menuGeog);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex-shrink border-r border-black">
        <Map
          mapboxApiAccessToken="pk.eyJ1Ijoic3RldmVuZHNheWxvciIsImEiOiJja295ZmxndGEwbGxvMm5xdTc3M2MwZ2xkIn0.WDBLMZYfh-ZGFjmwO82xvw"
          layerPanelVariant={LayerPanelVariant.Left}
          assetTypes={assetTypes}
          menuGeogTypes={menuLayers}
          onClick={handleClick}
        />
      </div>
      <div className="min-w-0 w-1/4 p-2 flex-column">
        <div className="min-h-0 max-h-24">
          <ConnectedGeographySection {...geog} />
          <Divider weight="thick"/>
        </div>
        <div className="overflow">
          {!!geog && (
            <ConnectedDataViz
              variant={DataVizVariant.Blurb}
              geogIdentifier={geog}
              dataVizID={bigValViz}
            />
          )}
          {!!geog && (
            <ConnectedDataViz
              variant={DataVizVariant.Details}
              geogIdentifier={geog}
              dataVizID={chartViz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const menuLayers: GeogTypeDescriptor[] = [
  {
    id: GeographyType.BlockGroup,
    name: 'Block Group',
    tableName: 'census_blockgroup',
    cartoSql:
      "SELECT *, name as map_name, 'blockGroup' as geogType, geoid as geogID FROM census_blockgroup  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Smallest geographical unit w/ ACS sample data.',
  },
  {
    id: GeographyType.Tract,
    name: 'Tract',
    tableName: 'census_tract',
    cartoSql:
      "SELECT *, name as map_name, 'tract' as geogType, geoid as geogID FROM census_tract  WHERE statefp = '42' AND countyfp IN ('003','019','128','007','005','063','129','051','059','125','073')",
    description: 'Drawn to encompass ~2500-8000 people',
  },
];

const bigValViz = {
  id: 39,
  name: 'Median Age',
  slug: 'median-age',
  vizType: DataVizType.BigValue,
  description: '',
  staticOptions: {},
};

const tableViz = {
  id: 16,
  name: 'Population by Race',
  slug: 'pop-by-race',
  vizType: DataVizType.Table,
  description: '',
  staticOptions: {},
};

const chartViz = {
  id: 68,
  name: 'Population by Race',
  slug: 'pop-race-bar-chart',
  vizType: DataVizType.Chart,
  description: '',
  staticOptions: {
    acrossGeogs: false,
  },
};