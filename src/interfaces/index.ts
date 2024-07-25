import  { Document } from 'mongoose';


export interface ITour extends Document {
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'difficult';
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount?: number;
    summary: string;
    description?: string;
    imageCover: string;
    images: string[];
    createdAt: Date;
    startDates: Date[];
    secretTour: boolean;
    durationWeeks?: number;
  }