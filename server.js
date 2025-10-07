const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: ['http://localhost:3000', 'https://consultcraftinc.com'], 
    credentials: true
}));

app.use(express.json());

// SerpAPI configuration from environment
const SERPAPI_KEY = process.env.SERPAPI_KEY;
if (!SERPAPI_KEY) {
    console.warn('Warning: SERPAPI_KEY is not set in environment. /api/news will fail until configured.');
}

// News API endpoint - proxy for SerpAPI Google News
app.get('/api/news', async (req, res) => {
    try {
        const { query, category } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        console.log(`Backend: Fetching news for query "${query}" in category "${category}"`);

        // Build SerpAPI URL for Google News
        const serpApiUrl = new URL('https://serpapi.com/search.json');
        serpApiUrl.searchParams.append('engine', 'google_news');
        serpApiUrl.searchParams.append('q', query);
        serpApiUrl.searchParams.append('api_key', SERPAPI_KEY);
        serpApiUrl.searchParams.append('num', '10'); // Number of results
        serpApiUrl.searchParams.append('hl', 'en'); // Language
        serpApiUrl.searchParams.append('gl', 'us'); // Country

        // Log a redacted URL (avoid leaking api_key)
        const redactedUrl = new URL(serpApiUrl);
        if (redactedUrl.searchParams.has('api_key')) {
            redactedUrl.searchParams.set('api_key', '****');
        }
        console.log(`Backend: Calling SerpAPI with URL: ${redactedUrl.toString()}`);

        // Make request to SerpAPI
        const response = await fetch(serpApiUrl.toString());
        
        if (!response.ok) {
            throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Check for SerpAPI errors
        if (data.error) {
            throw new Error(`SerpAPI error: ${data.error}`);
        }

        // Transform SerpAPI response to match our expected format
        const articles = (data.news_results || []).map(item => ({
            title: item.title || 'No title',
            snippet: item.snippet || 'No description available',
            link: item.link || '#',
            source: item.source || 'Unknown',
            date: item.date || new Date().toISOString(),
            thumbnail: item.thumbnail || null,
            position: item.position || 0
        }));

        console.log(`Backend: Successfully fetched ${articles.length} articles`);

        res.json({
            success: true,
            query,
            category,
            articles,
            total: articles.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Backend error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            query: req.query.query,
            category: req.query.category,
            articles: [],
            total: 0,
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'SerpAPI Proxy Server is running',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'SerpAPI Proxy Server',
        endpoints: {
            news: '/api/news?query=your_search_term&category=optional_category',
            health: '/api/health'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`SerpAPI Proxy Server running on http://localhost:${PORT}`);
    console.log(`News API endpoint: http://localhost:${PORT}/api/news`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;