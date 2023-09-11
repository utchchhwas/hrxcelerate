import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  Container,
  Chip,
  Avatar,
  Pagination,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const JobSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/public-job-postings/',
        {
          params: {
            search: searchText,
            page: currentPage,
          },
        }
      );
      const responseData = response.data.results;
      const totalCount = response.data.count;
      const pages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      setSearchResults(responseData);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleSearchClick();
  }, [currentPage, searchText]);

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>HRXcelerate - Job Search</Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            flex='1'
          >
            <TextField
              variant='outlined'
              size='small'
              placeholder='Search...'
              sx={{ width: 400, bgcolor: 'white', borderRadius: 2 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              style={{ marginLeft: '10px' }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth='lg'
        style={{ marginTop: '20px' }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {searchResults.map((result) => (
          <Card
            key={result.id}
            sx={{
              width: '60%',
              marginBottom: '20px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              display: 'flex',
            }}
          >
            <Avatar
              alt={result.company.name}
              src={result.company.logo}
              sx={{
                width: 150,
                height: 150,
                flexShrink: 0, // Prevent the logo from shrinking
                p: 2,
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: '1', // Allow the content to take up remaining space
                padding: '16px', // Add padding to the content
              }}
            >
              <Typography variant='h5' gutterBottom>
                {result.company.name}
              </Typography>
              <Typography variant='h6' color='textSecondary' sx={{ mb: 2 }}>
                Job Role: {result.job_role_name}
              </Typography>
              <Typography
                component='article'
                variant='body2'
                color='textSecondary'
              >
                Tags:
                {result.tags.split(', ').map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{ mx: '4px', borderRadius: 2 }}
                  />
                ))}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: 2 }}>
              <Button
                component={Link}
                to={`/job-apply/${result.id}`}
                variant='contained'
                color='primary'
                sx={{ height: 40, width: 80 }}
              >
                Apply
              </Button>
            </Box>
          </Card>
        ))}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '20px',
            mb: '30px',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      </Container>
    </>
  );
};

export default JobSearch;
