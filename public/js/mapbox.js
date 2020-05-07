/* eslint-disable */
export const displayMap = locations => {
    mapboxgl.accessToken =
    'pk.eyJ1Ijoia2piMTYiLCJhIjoiY2s5eDM3aW85MGczOTNsbWtwMTNuNWo0byJ9.arYbDgkeAl8jVdhLNt_ibQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kjb16/ck2nhtyj51cl11cov9b9ke4zj',
    scrollZoom: false
    // center: [-79.393321, 43.647961],
    // zoom: 13,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extends map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
