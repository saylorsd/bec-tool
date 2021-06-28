import {useState} from 'react';
import '@wprdc/test-components/src/styles/global.css'

import {
  ConnectedDataViz,
  ConnectedGeographySection,
  DataVizType,
  DataVizVariant,
  Divider,
  GeogIdentifier,
  GeographyType,
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
          layerPanelVariant={LayerPanelVariant.Inside}
          assetTypes={assetTypes}
          menuGeogType={GeographyType.BlockGroup}
          onClick={handleClick}
        />
      </div>
      <div className="w-96 p-2 flex-column">
        <div className="min-h-0 max-h-24">
          <ConnectedGeographySection {...geog} />
          <Divider weight="thick"/>
        </div>
        <div className="overflow">
          {!!geog && (
            <ConnectedDataViz
              variant={DataVizVariant.Blurb}
              geogIdentifier={geog}
              dataVizID={dataViz}
            />
          )}
        </div>
      </div>
    </div>
  );
}
