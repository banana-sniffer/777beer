import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Table,
  Button,
  Input,
  Box,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import beerList from './artifacts/beer_list.csv'; // Ensure this path matches your file location
import "@cloudscape-design/global-styles/index.css"

function BeerTable() {
  const [beerData, setBeerData] = useState([]); // For table data
  const [newBeer, setNewBeer] = useState({
    name: '',
    parentType: '',
    type: '',
    ba: '',
    brand: '',
    origin: '',
    abv: '',
    danger: '',
    shown: '',
    final: '',
    dongerComments: '',
    shawooComments: '',
  }); // New row data

  // Load and parse CSV file
  useEffect(() => {
    Papa.parse(beerList, {
      download: true,
      header: true,
      complete: (result) => {
        const formattedData = result.data.map((row) => ({
          name: row.NAME || '',
          parentType: row['PARENT TYPE'] || '',
          type: row.TYPE || '',
          brand: row.BRAND || '',
          origin: row.ORIGIN || '',
          abv: row.ABV || '',
          danger: row['DNGR '] || '',
          shown: row['SHWN '] || '',
          final: row.FINAL || '',
          dongerComments: row['DONGER COMMENTS'] || '',
          shawooComments: row['SHAWOOBOO COMMENTS'] || '',
        }));
        setBeerData(formattedData);
      },
    });
  }, []);

  // Add new beer to the table
  const addNewBeer = () => {
    setBeerData([...beerData, newBeer]);
    setNewBeer({
      name: '',
      parentType: '',
      type: '',
      ba: '',
      brand: '',
      origin: '',
      abv: '',
      danger: '',
      shown: '',
      final: '',
      dongerComments: '',
      shawooComments: '',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer List</h1>

        {/* Cloudscape Table */}
        <Table
          columnDefinitions={[
            { header: 'Name', cell: (item) => item.name },
            { header: 'Parent Type', cell: (item) => item.parentType },
            { header: 'Type', cell: (item) => item.type },
            { header: 'Brand', cell: (item) => item.brand },
            { header: 'Origin', cell: (item) => item.origin },
            { header: 'ABV', cell: (item) => item.abv },
            { header: 'DNGR', cell: (item) => item.danger },
            { header: 'SHWN', cell: (item) => item.shown },
            { header: 'Final', cell: (item) => item.final },
            { header: 'Donger Comments', cell: (item) => item.dongerComments },
            { header: 'Shawoo Comments', cell: (item) => item.shawooComments },
          ]}
          items={beerData}
          trackBy="name"
        />
      </header>
    </div>
  );
}

export default BeerTable;


// {/* Add New Beer Form */}
//         {/* <Box margin={{ top: 'm' }}>
//           <Header variant="h3">Add a New Beer</Header>
//           <SpaceBetween size="s">
//             <Input
//               placeholder="Name"
//               value={newBeer.name}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, name: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="Type"
//               value={newBeer.type}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, type: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="BA"
//               value={newBeer.ba}
//               onChange={(e) => setNewBeer({ ...newBeer, ba: e.detail.value })}
//             />
//             <Input
//               placeholder="Brand"
//               value={newBeer.brand}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, brand: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="Origin"
//               value={newBeer.origin}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, origin: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="ABV"
//               value={newBeer.abv}
//               onChange={(e) => setNewBeer({ ...newBeer, abv: e.detail.value })}
//             />
//             <Input
//               placeholder="DNGR"
//               value={newBeer.danger}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, danger: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="SHWN"
//               value={newBeer.shown}
//               onChange={(e) =>
//                 setNewBeer({ ...newBeer, shown: e.detail.value })
//               }
//             />
//             <Input
//               placeholder="Final"
//               value={newBeer.final}
//               onChange={(e) => setNewBeer({ ...newBeer, final: e.detail.value })}
//             />
//             <Input
//               placeholder="Donger Comments"
//               value={newBeer.dongerComments}
//               onChange={(e) =>
//                 setNewBeer({
//                   ...newBeer,
//                   dongerComments: e.detail.value,
//                 })
//               }
//             />
//             <Input
//               placeholder="Shawoo Comments"
//               value={newBeer.shawooComments}
//               onChange={(e) =>
//                 setNewBeer({
//                   ...newBeer,
//                   shawooComments: e.detail.value,
//                 })
//               }
//             />
//             <Button onClick={addNewBeer}>Add Beer</Button>
//           </SpaceBetween>
//         </Box> */}