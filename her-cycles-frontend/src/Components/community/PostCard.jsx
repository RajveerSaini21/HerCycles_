import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import Post from '../../Entities/Post.json';

export default function PostCard({ post }) {
  const [likes, setLikes] = React.useState(post.likes_count || 0);

  const handleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newLikes = likes + 1;
    setLikes(newLikes);
    await Post.update(post.id, { likes_count: newLikes });
  };
  
  return (
    <Link to={createPageUrl(`Post?id=${post.id}`)} className="block">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">{post.title}</CardTitle>
            <Badge className="bg-violet-100 text-violet-700 capitalize shrink-0">{post.category.replace(/_/g, ' ')}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
            <span>By {post.anonymous_name}</span>
            <span>·</span>
            <span>{formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{post.content}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-pink-600" onClick={handleLike}>
            <Heart className={`w-4 h-4 ${likes > post.likes_count ? 'text-pink-500 fill-current' : ''}`} />
            {likes}
          </Button>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-4 h-4" />
            {post.comments_count || 0}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}