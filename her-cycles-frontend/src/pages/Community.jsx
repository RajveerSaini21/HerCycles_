
// import React, { useState, useEffect, useCallback } from "react";
// import Post from "../Entities/Post.json";
// import { Button } from "../Components/ui/button";
// import { Plus, MessageCircle } from "lucide-react";
// import PostCard from "../Components/community/PostCard";
// import PostForm from "../Components/community/PostForm";
// import { Tabs, TabsList, TabsTrigger } from "../Components/ui/tabs";
// import { Skeleton } from "../Components/ui/skeleton";

// const CATEGORIES = ["all", "general_health", "period_questions", "birth_control", "pregnancy", "mental_health"];

// export default function CommunityPage() {
//   const [posts, setPosts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("all");

//   const loadPosts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const filter = activeCategory === "all" ? {} : { category: activeCategory };
//       const data = await Post.filter(filter, '-created_date');
//       setPosts(data);
//     } catch (error) {
//       console.error("Error loading posts:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [activeCategory]); // Dependency on activeCategory because it's used inside loadPosts

//   useEffect(() => {
//     loadPosts();
//   }, [loadPosts]); // Dependency on loadPosts, which is now memoized by useCallback

//   const handleSavePost = async (postData) => {
//     try {
//       await Post.create(postData);
//       setShowForm(false);
//       loadPosts();
//     } catch (error) {
//       console.error("Error creating post:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
//             Community Forum
//           </h1>
//           <p className="text-gray-600 mt-2">Connect, share, and learn with the community. Anonymously.</p>
//         </div>
//         <Button 
//           onClick={() => setShowForm(true)}
//           className="bg-gradient-to-r from-violet-500 to-cyan-600 hover:from-violet-600 hover:to-cyan-700 shadow-lg"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Create Post
//         </Button>
//       </div>
      
//       {/* Category Filter */}
//       <Tabs value={activeCategory} onValueChange={setActiveCategory}>
//         <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-violet-100/50">
//           {CATEGORIES.map(cat => (
//             <TabsTrigger key={cat} value={cat} className="capitalize data-[state=active]:bg-violet-500 data-[state=active]:text-white">
//               {cat.replace(/_/g, ' ')}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>

//       {/* Posts */}
//       <div className="space-y-6">
//         {isLoading ? (
//           Array(3).fill(0).map((_, i) => (
//             <Skeleton key={i} className="h-40 rounded-2xl bg-gray-100" />
//           ))
//         ) : posts.length > 0 ? (
//           posts.map(post => <PostCard key={post.id} post={post} />)
//         ) : (
//           <div className="text-center py-20 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50">
//             <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">No posts in this category yet.</h3>
//             <p className="text-gray-500 mt-2 mb-6">Be the first to start a conversation!</p>
//             <Button onClick={() => setShowForm(true)} className="bg-violet-500 hover:bg-violet-600">
//               <Plus className="w-4 h-4 mr-2" /> Create a Post
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Post Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <PostForm
//               onSave={handleSavePost}
//               onCancel={() => setShowForm(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../Components/ui/button";
import { Plus, MessageCircle } from "lucide-react";
import PostCard from "../Components/community/PostCard";
import PostForm from "../Components/community/PostForm";
import { Tabs, TabsList, TabsTrigger } from "../Components/ui/tabs";
import { Skeleton } from "../Components/ui/skeleton";

const API_BASE = "http://localhost:5001/api/community";
const CATEGORIES = ["all", "general_health", "period_questions", "birth_control", "pregnancy", "mental_health"];

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Load posts from backend
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const url =
        activeCategory === "all"
          ? `${API_BASE}/posts`
          : `${API_BASE}/posts?category=${activeCategory}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Save new post
  const handleSavePost = async (postData) => {
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (!res.ok) throw new Error("Failed to create post");
      await loadPosts();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-gray-600 mt-2">
            Connect, share, and learn with the community. Anonymously.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-violet-500 to-cyan-600 hover:from-violet-600 hover:to-cyan-700 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Category Filter */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-violet-100/50">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="capitalize data-[state=active]:bg-violet-500 data-[state=active]:text-white"
            >
              {cat.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Posts */}
      <div className="space-y-6">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl bg-gray-100" />
            ))
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="text-center py-20 rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No posts in this category yet.
            </h3>
            <p className="text-gray-500 mt-2 mb-6">
              Be the first to start a conversation!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-violet-500 hover:bg-violet-600"
            >
              <Plus className="w-4 h-4 mr-2" /> Create a Post
            </Button>
          </div>
        )}
      </div>

      {/* Post Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <PostForm onSave={handleSavePost} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
