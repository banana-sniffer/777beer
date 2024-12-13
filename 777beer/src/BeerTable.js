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
    Modal,
    SpaceBetween,
    Form,
    FormField,
    Input,
} from '@cloudscape-design/components';
import { columnDefinitions, getMatchesCountText, paginationLabels, collectionPreferencesProps, defaultPreferences } from './BeerTable-config';
import { BeerRatingButtons } from './BeerRatingButtons'; // Import the new buttons component
import beerList from './artifacts/beer_list.csv';
import "@cloudscape-design/global-styles/index.css"

// Ref: https://cloudscape.design/get-started/dev-guides/collection-hooks/

// TODO: Need to figure out exporting the file itself
// TODO: Adding a new beer itself to the list
// TODO: Search by particular parent type of beer
// TODO: Add in the beers you should know tag to some of these

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
    const [displayData, setDisplayData] = useState([]); // For displaying filtered data
    const [currentView, setCurrentView] = useState('all'); // Track current view

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [newBeer, setNewBeer] = useState({
        name: '',
        parentType: '',
        type: '',
        brand: '',
        origin: '',
        abv: '',
        danger: '',
        shown: '',
        final: '',
        dongerComments: '',
        shawooComments: '',
    });
    
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
                setDisplayData(formattedData);
            },
        });
    }, []);

    // Function to get top 10 beers based on a specific rating
    const getTopBeers = (ratingField) => {
        // Convert rating to number and sort
        const sortedBeers = [...beerData]
            .filter(beer => !isNaN(parseFloat(beer[ratingField])))
            .sort((a, b) => parseFloat(b[ratingField]) - parseFloat(a[ratingField]))
            .slice(0, 10);
        
        setDisplayData(sortedBeers);
        setCurrentView(ratingField);
    };

    // Reset to all beers
    const resetToAllBeers = () => {
        setDisplayData(beerData);
        setCurrentView('all');
    };
    
    const [preferences, setPreferences] = useState(defaultPreferences);
    const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
        displayData,
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

    const addNewBeer = () => {
        setBeerData([...beerData, newBeer]);
        setDisplayData([...beerData, newBeer]);
        setIsAddModalVisible(false);
        setNewBeer({
            name: '',
            parentType: '',
            type: '',
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

    const handleInputChange = (field, value) => {
        setNewBeer((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <Table
            {...collectionProps}
            header={
                <Header
                counter={`(${items.length})`}
                actions={
                    <SpaceBetween
                    direction="horizontal"
                    size="xs"
                    >
                    <BeerRatingButtons 
                        onFinalRating={() => getTopBeers('final')}
                        onDngrRating={() => getTopBeers('danger')}
                        onShwnRating={() => getTopBeers('shown')}
                        onResetBeers={resetToAllBeers}
                        currentView={currentView}
                    />
                    <Button onClick={() => setIsAddModalVisible(true)}>Add New Beer</Button>
                    </SpaceBetween>
                    }
                >
                {currentView === 'all' ? 'Beers' : `Top 10 Beers by ${currentView.toUpperCase()} Rating`}
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

            <Modal
                visible={isAddModalVisible}
                onDismiss={() => setIsAddModalVisible(false)}
                header="Add New Beer"
                footer={
                    <SpaceBetween direction="horizontal" size="s">
                        <Button variant="link" onClick={() => setIsAddModalVisible(false)}>Cancel</Button>
                        <Button onClick={addNewBeer}>Add Beer</Button>
                    </SpaceBetween>
                }
            >
                <Form>
                    <SpaceBetween direction="vertical" size="l">
                        {Object.keys(newBeer).map((key) => (
                            <FormField key={key} label={key.toUpperCase()}>
                                <Input
                                    value={newBeer[key]}
                                    onChange={({ detail }) => handleInputChange(key, detail.value)}
                                />
                            </FormField>
                        ))}
                    </SpaceBetween>
                </Form>
            </Modal>
        </>
    );
}