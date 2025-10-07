

export default async function handler(req, res) {
    // Enable CORS - Allow all origins for now (can restrict later)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { query, category } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const SERPAPI_KEY = process.env.SERPAPI_KEY;
        
        if (!SERPAPI_KEY) {
            console.error('SERPAPI_KEY not configured');
            return res.status(500).json({ 
                error: 'API key not configured',
                success: false 
            });
        }

        console.log(`Serverless: Fetching news for query "${query}" in category "${category}"`);


        const serpApiUrl = new URL('https://serpapi.com/search.json');
        serpApiUrl.searchParams.append('engine', 'google_news');
        serpApiUrl.searchParams.append('q', query);
        serpApiUrl.searchParams.append('api_key', SERPAPI_KEY);
        serpApiUrl.searchParams.append('num', '10');
        serpApiUrl.searchParams.append('hl', 'en');
        serpApiUrl.searchParams.append('gl', 'us');


        const response = await fetch(serpApiUrl.toString());
        
        if (!response.ok) {
            throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        

        if (data.error) {
            throw new Error(`SerpAPI error: ${data.error}`);
        }


        const articles = (data.news_results || []).map(item => ({
            title: item.title || 'No title',
            snippet: item.snippet || 'No description available',
            link: item.link || '#',
            source: item.source || 'Unknown',
            date: item.date || new Date().toISOString(),
            thumbnail: item.thumbnail || null,
            position: item.position || 0
        }));

        console.log(`Serverless: Successfully fetched ${articles.length} articles`);

        res.status(200).json({
            success: true,
            query,
            category,
            articles,
            total: articles.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Serverless error:', error.message);
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
}
