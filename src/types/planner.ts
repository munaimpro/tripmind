export interface PlannerFormData {
    destination: string;
    budget: string;
    duration: number;
    travelStyle: string;
    groupType: string;
    interests: string[];
}

export interface Activity {
    time: string;
    description: string;
    estimatedCost: number;
}

export interface DayItinerary {
    dayNumber: number;
    activities: Activity[];
}

export interface Accommodation {
    hotelName: string;
    type: string;
    estimatedCostPerNight: number;
}

export interface AIPlanResult {
    title: string;
    destination: string;
    summary: string;
    duration: number;
    totalEstimatedCost: number;
    currency: string;
    itinerary: DayItinerary[];
    accommodations: Accommodation[];
}
