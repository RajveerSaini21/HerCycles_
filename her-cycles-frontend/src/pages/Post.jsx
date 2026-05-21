import React, { useState, useEffect } from 'react';
import Post from "../Entities/Post.json";
import  Comment  from '../Entities/Comment.json';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../Components/ui/card';
import { Badge } from '../Components/ui/badge';
import { Button } from '../Components/ui/button';
import { Textarea } from '../Components/ui/textarea';
import { Heart, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Skeleton } from '../Components/ui/skeleton';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const ANONYMOUS_NAMES = ["StarlightSeeker", "Moonflower", "OceanWhisper", "Sunbeam", "WillowGrace", "RiverSong", "EchoSoul", "ForestHeart", "CosmicDreamer"];

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anonymousName, setAnonymousName] = React.useState('');

  useEffect(() => {
    setAnonymousName(ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)]);
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
      loadPostAndComments(postId);
    }
  }, []);
  
  const loadPostAndComments = async (postId) => {
    setIsLoading(true);
    try {
      const [postData, commentsData] = await Promise.all([
        Post.get(postId),
        Comment.filter({ post_id: postId }, '-created_date')
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      await Comment.create({
        post_id: post.id,
        content: newComment,
        anonymous_name: anonymousName
      });
      setNewComment('');
      // Optimistically update post comment count
      await Post.update(post.id, { comments_count: (post.comments_count || 0) + 1 });
      loadPostAndComments(post.id);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link to={createPageUrl('Community')} className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-800">
        <ArrowLeft className="w-4 h-4" />
        Back to Community
      </Link>
      
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-violet-100">
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">{post.title}</CardTitle>
            <Badge className="bg-violet-100 text-violet-700 capitalize shrink-0">{post.category.replace(/_/g, ' ')}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
            <span>By {post.anonymous_name}</span>
            <span>·</span>
            <span>{formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}</span>
          </div>
        </CardHeader>
        <CardContent className="py-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-pink-600">
            <Heart className="w-4 h-4" /> {post.likes_count || 0}
          </Button>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-4 h-4" /> {post.comments_count || 0}
          </div>
        </CardFooter>
      </Card>
      
      {/* Add Comment Form */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Add a Comment</CardTitle>
           <p className="text-sm text-violet-700">You are commenting as: <span className="font-semibold">{anonymousName}</span></p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddComment} className="space-y-4">
            <Textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="border-violet-200 focus:border-violet-400 h-24"
              disabled={isSubmitting}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="bg-violet-500 hover:bg-violet-600">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Comments ({comments.length})</h3>
        {comments.map(comment => (
          <Card key={comment.id} className="border-0 bg-white/50 backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-violet-700">{comment.anonymous_name}</span>
                <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}