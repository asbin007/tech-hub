
import {  useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Status } from "../../globals/types/types";
import { createReview, removeReview } from "../../store/reviewSlice";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  User?: {
    id: string;
    username: string;
  } | null;
}

interface ReviewProps {
  review: ReviewItem[];
  productId: string;
}

const Review: React.FC<ReviewProps> = ({ review, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const reviewStatus = useAppSelector((store) => store.review.status);
  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length < 10 || comment.length > 1000) {
      alert("Comment must be between 10 and 1000 characters.");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }
    await dispatch(
      createReview({
        rating,
        comment,
        productId,
        id: "", // Placeholder: Backend should generate
        userId: "", // Placeholder: Backend should use authenticated user
        createdAt: new Date().toISOString(), // Default value
        User: { id: "", username: "" }, // Default user object
      })
    );
    setComment("");
    setRating(0);
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await dispatch(removeReview(reviewId));
    }
  };

  if (reviewStatus === Status.LOADING) {
    return (
      <div className="text-gray-600 text-center py-12">Loading reviews...</div>
    );
  }

  if (reviewStatus === Status.ERROR) {
    return (
      <div className="text-red-600 text-center py-12">
        Error loading reviews
      </div>
    );
  }

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Customer Reviews
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-8">
            {review.length === 0 ? (
              <p className="text-gray-600 italic text-sm lg:text-base">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              review.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-gray-100 rounded-md"
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="text-sm lg:text-base font-semibold text-gray-800">
                          {item?.User?.username || "Anonymous"}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-sm lg:text-base text-gray-600">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-md">
            <h3 className="text-sm lg:text-base font-bold text-gray-800 mb-4">
              Write a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  className="px-4 py-3 bg-white focus:bg-gray-50 text-gray-800 w-full text-sm rounded-md focus:outline-gray-600 resize-none"
                  placeholder="Write your comment..."
                  rows={4}
                  value={comment}
                  onChange={handleCommentChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm lg:text-base text-gray-800 font-semibold">
                  Your Rating:
                </span>
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingChange(i + 1)}
                    className={`text-2xl transition ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="rounded-md px-4 py-2.5 text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
