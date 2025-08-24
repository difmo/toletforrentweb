import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ property }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reviewCategories = [
    { key: 'all', label: 'All Reviews', count: property?.reviewCount },
    { key: 'cleanliness', label: 'Cleanliness', count: 45 },
    { key: 'location', label: 'Location', count: 38 },
    { key: 'communication', label: 'Communication', count: 42 },
    { key: 'value', label: 'Value', count: 35 }
  ];

  const ratingBreakdown = [
    { stars: 5, count: 156, percentage: 78 },
    { stars: 4, count: 32, percentage: 16 },
    { stars: 3, count: 8, percentage: 4 },
    { stars: 2, count: 3, percentage: 1.5 },
    { stars: 1, count: 1, percentage: 0.5 }
  ];

  const detailedRatings = [
    { category: 'Cleanliness', rating: 4.8 },
    { category: 'Accuracy', rating: 4.9 },
    { category: 'Check-in', rating: 4.7 },
    { category: 'Communication', rating: 4.9 },
    { category: 'Location', rating: 4.6 },
    { category: 'Value', rating: 4.5 }
  ];

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      date: "August 2025",
      content: `Amazing stay! The apartment was exactly as described and even better in person. The location is perfect - walking distance to everything we wanted to see. The host was incredibly responsive and helpful throughout our stay.`,
      helpful: 12,
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"
      ]
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      date: "July 2025",
      content: `Fantastic property with all the amenities you could need. The kitchen was well-equipped, the bed was comfortable, and the WiFi was fast. Great value for money and would definitely stay again!`,
      helpful: 8,
      photos: []
    },
    {
      id: 3,
      author: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
      date: "July 2025",
      content: `Really enjoyed our stay here. The space was clean and comfortable. Only minor issue was the noise from the street in the early morning, but overall a great experience. The host provided excellent local recommendations.`,
      helpful: 5,
      photos: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
      ]
    },
    {
      id: 4,
      author: "David Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
      date: "June 2025",
      content: `Perfect location and beautiful apartment. Everything was spotless and the check-in process was seamless. The host thought of every detail to make our stay comfortable. Highly recommend!`,
      helpful: 15,
      photos: []
    },
    {
      id: 5,
      author: "Lisa Thompson",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
      date: "June 2025",
      content: `Outstanding experience from start to finish. The property photos don't do justice to how lovely this place is. Great communication from the host and the location couldn't be better.`,
      helpful: 9,
      photos: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400"
      ]
    }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground/30"}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="Star" size={24} className="text-warning fill-current" />
          <h2 className="text-2xl font-bold text-foreground">
            {property?.rating} · {property?.reviewCount} reviews
          </h2>
        </div>
      </div>
      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Rating Distribution */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Rating breakdown</h3>
          <div className="space-y-3">
            {ratingBreakdown?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-muted-foreground">{item?.stars}</span>
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{item?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Ratings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Category ratings</h3>
          <div className="grid grid-cols-2 gap-4">
            {detailedRatings?.map((item) => (
              <div key={item?.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item?.category}</span>
                  <span className="text-sm font-medium text-foreground">{item?.rating}</span>
                </div>
                <div className="bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary rounded-full h-1.5 transition-all duration-300"
                    style={{ width: `${(item?.rating / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Review Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {reviewCategories?.map((category) => (
          <button
            key={category?.key}
            onClick={() => setSelectedCategory(category?.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              selectedCategory === category?.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category?.label} ({category?.count})
          </button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={review?.avatar}
                  alt={review?.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{review?.author}</h4>
                    <p className="text-sm text-muted-foreground">{review?.date}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(review?.rating)}
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">{review?.content}</p>
                
                {/* Review Photos */}
                {review?.photos?.length > 0 && (
                  <div className="flex space-x-2">
                    {review?.photos?.map((photo, index) => (
                      <div key={index} className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Helpful Button */}
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpful})</span>
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-smooth">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show less' : `Show all ${property?.reviewCount} reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;