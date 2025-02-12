import React, { useState, useEffect } from 'react';
import { Home, User, Bell, Mail, Bookmark, Settings, Search, PenSquare, DollarSign } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Navigation */}
      <nav className="w-64 border-r border-gray-800 p-4 fixed h-screen">
        <div className="space-y-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-400 mb-8">
            Chirp
          </div>
          
          {/* Navigation Items */}
          <div className="space-y-4">
            <NavItem icon={<Home />} text="Home" active={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
            <NavItem icon={<Search />} text="Explore" active={currentPage === 'explore'} onClick={() => setCurrentPage('explore')} />
            <NavItem icon={<Bell />} text="Notifications" active={currentPage === 'notifications'} onClick={() => setCurrentPage('notifications')} />
            <NavItem icon={<Mail />} text="Messages" active={currentPage === 'messages'} onClick={() => setCurrentPage('messages')} />
            <NavItem icon={<Bookmark />} text="Bookmarks" active={currentPage === 'bookmarks'} onClick={() => setCurrentPage('bookmarks')} />
            <NavItem icon={<DollarSign />} text="Currency Converter" active={currentPage === 'converter'} onClick={() => setCurrentPage('converter')} />
            <NavItem icon={<User />} text="Profile" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
            <NavItem icon={<Settings />} text="Settings" active={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
            
            {/* Post Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full font-bold transition">
              Post
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 sticky top-0 bg-black/80 backdrop-blur-sm">
          <h1 className="text-xl font-bold">{currentPage === 'converter' ? 'Currency Converter' : 'Home'}</h1>
        </header>

        {currentPage === 'converter' ? (
          <CurrencyConverter />
        ) : (
          <>
            {/* Create Post */}
            <div className="border-b border-gray-800 p-4">
              <div className="flex gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <textarea 
                    placeholder="What's happening?"
                    className="w-full bg-transparent border-none resize-none focus:ring-0 text-lg"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2 text-blue-400">
                      <button className="p-2 hover:bg-blue-500/10 rounded-full">
                        <PenSquare size={20} />
                      </button>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-full font-bold transition">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="divide-y divide-gray-800">
              <Post 
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                name="Sarah Wilson"
                handle="@sarahw"
                time="2h"
                content="Just launched my new project! 🚀 So excited to share it with everyone. Check it out and let me know what you think!"
                image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
              />
              <Post 
                avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                name="John Doe"
                handle="@johndoe"
                time="4h"
                content="Beautiful sunset today! 🌅 Nature never fails to amaze me."
                image="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
              />
            </div>
          </>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 p-4 border-l border-gray-800 hidden lg:block fixed right-0 h-screen">
        {/* Search */}
        <div className="bg-gray-900 rounded-full mb-4">
          <div className="flex items-center px-4 py-2">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none focus:ring-0 text-white w-full px-2"
            />
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="text-xl font-bold mb-4">Trending</h2>
          <div className="space-y-4">
            <TrendingTopic topic="Technology" posts="125K" />
            <TrendingTopic topic="Sports" posts="89K" />
            <TrendingTopic topic="Gaming" posts="54K" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function NavItem({ icon, text, active = false, onClick }) {
  return (
    <button 
      className={`flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 transition w-full ${active ? 'font-bold' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'KRW'];

  useEffect(() => {
    const convertCurrency = async () => {
      if (!amount || isNaN(amount)) return;
      
      setLoading(true);
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setResult(parseFloat(amount) * rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      } finally {
        setLoading(false);
      }
    };

    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Result</h3>
            {loading ? (
              <div className="text-center text-gray-400">Converting...</div>
            ) : (
              <div className="text-2xl font-bold">
                {result !== null && (
                  <>
                    {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Post({ avatar, name, handle, time, content, image }) {
  return (
    <article className="p-4 hover:bg-gray-900/50 transition cursor-pointer">
      <div className="flex gap-4">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{name}</span>
            <span className="text-gray-500">{handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{time}</span>
          </div>
          <p className="mt-2">{content}</p>
          {image && (
            <img src={image} alt="" className="mt-3 rounded-xl w-full object-cover max-h-96" />
          )}
          <div className="flex justify-between mt-3 text-gray-500">
            <button className="hover:text-blue-400 transition">💬 24</button>
            <button className="hover:text-green-400 transition">🔄 12</button>
            <button className="hover:text-red-400 transition">❤️ 348</button>
            <button className="hover:text-blue-400 transition">📊 82K</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function TrendingTopic({ topic, posts }) {
  return (
    <div className="hover:bg-gray-800/50 p-2 rounded transition cursor-pointer">
      <p className="text-gray-500 text-sm">Trending</p>
      <p className="font-bold">{topic}</p>
      <p className="text-gray-500 text-sm">{posts} posts</p>
    </div>
  );
}

export default App;