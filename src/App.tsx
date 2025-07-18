import React, { useState, useEffect } from 'react';
import { Star, Home, RotateCcw, Gamepad2, Trophy, Heart } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  description: string;
  iframeUrl: string;
  category: string;
  difficulty: string;
}

function App() {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  // 添加结构化数据到页面头部
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Spot the Difference Games',
      'description': 'Play exciting spot the difference games online! Find hidden differences in pictures.',
      'url': 'https://yourdomain.com/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://yourdomain.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 主游戏 - Spot the Difference Adventure (自动加载)
  const mainGame: Game = {
    id: 1,
    title: "Spot the Difference Adventure",
    description: "Find all the hidden differences in beautiful pictures!",
    iframeUrl: "https://scratch.mit.edu/projects/13375634/embed", // 使用Scratch游戏链接
    category: "Puzzle",
    difficulty: "Easy"
  };

  // 其他游戏列表 - 以卡片形式展示
  const otherGames: Game[] = [
    {
      id: 2,
      title: "Memory Match Game",
      description: "Test your memory with colorful card matching!",
      iframeUrl: "https://example.com/memory-game", // 替换为真实游戏URL
      category: "Memory",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Jigsaw Puzzle Fun",
      description: "Complete beautiful jigsaw puzzles piece by piece!",
      iframeUrl: "https://example.com/jigsaw-game", // 替换为真实游戏URL
      category: "Puzzle",
      difficulty: "Hard"
    },
    {
      id: 4,
      title: "Color Matching Game",
      description: "Match colors and learn about different shades!",
      iframeUrl: "https://example.com/color-game", // 替换为真实游戏URL
      category: "Educational",
      difficulty: "Easy"
    }
  ];

  const playOtherGame = (game: Game) => {
    setCurrentGame(game);
  };

  const backToMainGame = () => {
    setCurrentGame(null);
  };

  const reloadGame = () => {
    if (currentGame) {
      // 强制重新加载iframe
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = iframe.src;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 relative overflow-hidden">
      {/* 浮动卡通元素 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{animationDelay: '0s'}}>⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{animationDelay: '1s'}}>🌈</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🎈</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🦄</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-bounce" style={{animationDelay: '2.5s'}}>🎀</div>
      </div>

      {/* 头部导航 */}
      <div className="flex justify-between items-center p-4 bg-white/20 backdrop-blur-sm border-b-4 border-purple-300 shadow-lg relative z-10">
        <div className="text-3xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
          <div className="text-4xl animate-pulse">🔍</div>
          <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Spot the Difference
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentGame && (
            <>
              <button
                onClick={reloadGame}
                className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-white"
              >
                <RotateCcw className="w-6 h-6" />
                <span className="text-lg">Restart</span>
              </button>
              <button
                onClick={backToMainGame}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-white"
              >
                <Home className="w-6 h-6" />
                <span className="text-lg">Back</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 主游戏页面 - 默认显示 */}
      {!currentGame && (
        <div className="flex flex-col relative z-10">
          {/* 主游戏区域 */}
          <div className="p-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border-4 border-white/30 shadow-xl mb-6">
              <div className="text-center mb-4">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-3">
                  <span className="text-5xl animate-bounce">🎯</span>
                  {mainGame.title}
                  <span className="text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🎯</span>
                </h1>
                <p className="text-white/90 text-xl mt-2 drop-shadow-lg">
                  {mainGame.description}
                </p>
              </div>
              
              {/* 主游戏iframe */}
              <div className="w-full h-96 md:h-[500px] bg-white/10 backdrop-blur-sm rounded-2xl border-4 border-white/30 shadow-xl overflow-hidden">
                <iframe
                  src={mainGame.iframeUrl}
                  className="w-full h-full rounded-xl"
                  frameBorder="0"
                  allowFullScreen
                  title={mainGame.title}
                  allowTransparency={true}
                  scrolling="no"
                />
              </div>
            </div>
          </div>

          {/* 其他游戏卡片区域 */}
          <div className="p-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 mb-8 border-4 border-white/30 shadow-xl">
              <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg flex items-center justify-center gap-3">
                <span className="text-5xl animate-bounce">🎮</span>
                More Fun Games!
                <span className="text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🎮</span>
              </h2>
              <p className="text-white/90 text-xl text-center mt-4 drop-shadow-lg">
                Discover more exciting puzzle and educational games!
              </p>
            </div>

            {/* 游戏卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => playOtherGame(game)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">
                      {game.category === 'Puzzle' ? '🧩' : 
                       game.category === 'Memory' ? '🧠' : 
                       game.category === 'Educational' ? '📚' : '🎲'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                      {game.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-4 leading-relaxed">
                      {game.description}
                    </p>
                    <div className="flex justify-center gap-4 mb-6">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full text-purple-800 font-bold text-sm border-2 border-white">
                        {game.category}
                      </span>
                      <span className="bg-gradient-to-r from-green-400 to-teal-400 px-4 py-2 rounded-full text-white font-bold text-sm border-2 border-white">
                        {game.difficulty}
                      </span>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border-2 border-white flex items-center gap-3 mx-auto">
                      <Gamepad2 className="w-6 h-6" />
                      <span className="text-lg">Play Now!</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 其他游戏播放页面 */}
      {currentGame && (
        <div className="flex flex-col h-screen relative z-10">
          {/* 游戏信息栏 */}
          <div className="bg-white/20 backdrop-blur-sm p-4 border-b-4 border-purple-300 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-3">
                <span className="text-4xl animate-bounce">🎮</span>
                {currentGame.title}
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎮</span>
              </h2>
              <p className="text-white/90 text-lg mt-2 drop-shadow-lg">
                {currentGame.description}
              </p>
            </div>
          </div>

          {/* 游戏iframe容器 */}
          <div className="flex-1 p-4">
            <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 shadow-xl overflow-hidden">
              <iframe
                src={currentGame.iframeUrl}
                className="w-full h-full rounded-2xl"
                frameBorder="0"
                allowFullScreen
                title={currentGame.title}
                allowTransparency={true}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      )}

      {/* SEO内容区域 */}
      {!currentGame && (
        <div className="bg-white/20 backdrop-blur-sm mt-12 p-8 border-t-4 border-purple-300 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
                <span className="text-5xl animate-bounce">🎮</span>
                About Spot the Difference Games
                <span className="text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🎮</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-3xl p-8 border-4 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-4xl animate-bounce">🧩</span>
                  Educational Puzzle Games
                </h3>
                <p className="text-white/95 text-lg leading-relaxed">
                  Our spot the difference games are perfect educational puzzles for kids. These difference games help children develop visual perception, attention to detail, and problem-solving skills while having fun with colorful pictures and engaging challenges.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl p-8 border-4 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🎯</span>
                  Brain Training Games
                </h3>
                <p className="text-white/95 text-lg leading-relaxed">
                  These puzzle games serve as excellent brain training exercises for children. Spot the difference challenges improve concentration, enhance memory, and boost cognitive development through interactive gameplay that keeps kids engaged and learning.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-3xl p-8 border-4 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🌟</span>
                  Kids Learning Games
                </h3>
                <p className="text-white/95 text-lg leading-relaxed">
                  Our collection includes various kids games designed for learning and entertainment. From spot the difference adventures to memory games and jigsaw puzzles, each game promotes skill development while providing hours of educational fun.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-3xl p-8 border-4 border-white/30 shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                <span className="text-4xl animate-bounce">🌟</span>
                Why Play Spot the Difference Games?
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🌟</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/95">
                <div>
                  <h4 className="font-bold text-white mb-4 text-xl flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    Educational Benefits:
                  </h4>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="text-xl">✨</span>
                      Improves visual perception and attention to detail
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🎯</span>
                      Enhances concentration and focus abilities
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🧠</span>
                      Develops problem-solving and analytical skills
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">💡</span>
                      Boosts memory and cognitive function
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4 text-xl flex items-center gap-2">
                    <span className="text-2xl">🎮</span>
                    Game Features:
                  </h4>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🆓</span>
                      Free online difference games for all ages
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🖼️</span>
                      High-quality pictures and smooth gameplay
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">👶</span>
                      Kid-friendly interface and controls
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-xl">🏆</span>
                      Multiple difficulty levels and challenges
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-yellow-400/30 to-pink-400/30 rounded-3xl p-6 border-4 border-white/30 shadow-xl">
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                  <span className="text-3xl animate-bounce">🔍</span>
                  Keywords & Game Categories
                  <span className="text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🔍</span>
                </h4>
                <p className="text-white/90 text-lg leading-relaxed">
                  <strong>Popular Keywords:</strong> spot the difference, difference games, puzzle games, kids games, 
                  educational games, brain games, puzzles, children puzzles, learning games, cognitive development, 
                  problem solving games, visual perception games, attention games, concentration games, 
                  pattern recognition, observation games, memory games, skill development games, 
                  safe kids games, free online games, family games, preschool games, elementary games, 
                  brain training, educational puzzles, interactive games, fun learning activities
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;