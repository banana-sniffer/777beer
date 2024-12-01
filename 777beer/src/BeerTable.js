import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
    Box,
    Button,
    CollectionPreferences,
    Header,
    Pagination,
    Table,
    TextFilter,
} from '@cloudscape-design/components';
import { columnDefinitions, getMatchesCountText, paginationLabels, collectionPreferencesProps, defaultPreferences } from './BeerTable-config';
import beerList from './artifacts/beer_list.csv'; // Ensure this path matches your file location
import "@cloudscape-design/global-styles/index.css"

function EmptyState({ title, subtitle, action }) {
    return (
        <Box textAlign="center" color="inherit">
        <Box variant="strong" textAlign="center" color="inherit">
        {title}
        </Box>
        <Box variant="p" padding={{ bottom: 's' }} color="inherit">
        {subtitle}
        </Box>
        {action}
        </Box>
    );
}

export default function BeerTable() {
    const [beerData, setBeerData] = useState([]); // For table data
    
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
    
    const [preferences, setPreferences] = useState(defaultPreferences);
    const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
        beerData,
        {
            filtering: {
                empty: <EmptyState title="No beers :<(" action={<Button>Create instance</Button>} />,
                noMatch: (
                    <EmptyState
                    title="No matches"
                    action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}
                    />
                ),
            },
            pagination: { pageSize: preferences.pageSize },
            sorting: {},
            selection: {},
        }
    );

    console.log('willtai items', items)

    return (
        <Table
        {...collectionProps}
        header={
            <Header
            counter={`(${items.length})`}
            >
            Beers
            </Header>
        }
        columnDefinitions={columnDefinitions}
        columnDisplay={preferences.contentDisplay}
        items={items}
        pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
        filter={
            <TextFilter
            {...filterProps}
            countText={getMatchesCountText(filteredItemsCount)}
            filteringAriaLabel="Filter beers"
            />
        }
        preferences={
            <CollectionPreferences
            {...collectionPreferencesProps}
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
            />
        }
        />
    );
}