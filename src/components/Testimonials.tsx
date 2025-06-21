import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useFeedback } from '@/hooks/useFeedback';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Testimonials = () => {
  const { feedback, loading } = useFeedback();

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Loved by Creators & Marketers
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-white/5 p-6 rounded-2xl">
                <Skeleton className="h-6 w-2/5 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-4 mt-6">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-3/5 mb-2" />
                    <Skeleton className="h-4 w-2/5" />
                  </div>
                </div>
              </Card>
            ))
          ) : feedback.length > 0 ? (
            feedback.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-xl flex flex-col justify-between h-full"
              >
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 leading-relaxed italic">
                    "{testimonial.comment}"
                  </blockquote>
                </CardContent>
                <div className="p-6 pt-0 mt-auto flex items-center gap-4">
                   <Avatar>
                    <AvatarImage src={testimonial.user_avatar_url} alt={testimonial.user_name} />
                    <AvatarFallback>{testimonial.user_name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-white">{testimonial.user_name}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">Be the first to leave a feedback!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 