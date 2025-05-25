// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import PageWrapper from '../components/common/PageWrapper';
import { Heading1, Paragraph } from '../components/common/Typography';
import Button from '../components/common/Button';
import HabitList from '../components/dashboard/HabitList';
import HabitProgressChart from '../components/dashboard/HabitProgressChart';
import RecommendationCard from '../components/dashboard/RecommendationCard';
// import { FiPlusCircle } from 'react-icons/fi';

// --- TODO: Import your API services ---
// import habitService from '../services/habitService';
// import recommendationService from '../services/recommendationService';

const DashboardHeader = styled.div`
  width: 100%;
  max-width: 900px;
  margin-bottom: 30px;
  text-align: center;
`;

const AddHabitButton = styled(Button)`
  margin: 20px 0 30px 0;
  padding: 12px 25px;
  font-size: 1.1rem;
`;

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  max-width: 900px;

  @media (min-width: 1024px) { /* For larger screens, you might want a 2-column layout */
     /* grid-template-columns: 2fr 1fr; // Example: Main content (habits, charts) | Sidebar (recommendations, quick add) */
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// const SidebarColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
// `;


function DashboardPage() {
    const { user, authToken } = useAuth();
    const [habits, setHabits] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [showAddHabitModal, setShowAddHabitModal] = useState(false); // For modal

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!authToken) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                // --- TODO: API Calls ---
                // const [fetchedHabits, fetchedRecs] = await Promise.all([
                //     habitService.getHabits(authToken),
                //     recommendationService.getRecommendations(user.id, authToken)
                // ]);

                // Simulated data:
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
                const fetchedHabits = [
                    { id: 1, name: "Morning Run (5km)", description: "Cardio for energy", frequency: "daily", completedToday: false },
                    { id: 2, name: "Read 30 Pages", description: "Expand knowledge", frequency: "daily", completedToday: true },
                    { id: 3, name: "Meditate for 15 Minutes", description: "Mindfulness practice", frequency: "daily", completedToday: false },
                    { id: 4, name: "Code for 1 hour on side project", description: "Skill development", frequency: "Mon, Wed, Fri", completedToday: true },
                ];
                const fetchedRecs = { title: "Practice Deep Breathing", details: "Take 5 minutes for deep breathing exercises to reduce stress and improve focus." };

                setHabits(fetchedHabits);
                setRecommendations(fetchedRecs);
            } catch (err) {
                setError(err.message || "Failed to load dashboard data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, [authToken, user]);

    const handleToggleHabitCompletion = async (habitId) => {
        // --- TODO: API call to update habit completion status ---
        // const updatedHabit = await habitService.toggleHabit(authToken, habitId);
        setHabits(prevHabits =>
            prevHabits.map(h =>
                h.id === habitId ? { ...h, completedToday: !h.completedToday } : h
            )
        );
        // TODO: Add toast notification
        console.log(`Habit ${habitId} completion toggled! (Simulated)`);
    };

    const handleOpenAddHabit = () => {
        // setShowAddHabitModal(true); // If using a modal
        // OR navigate('/add-habit'); // If using a separate page
        alert('Open Add Habit Modal/Page (TODO: Implement)');
    };

    const handleEditHabit = (habitId) => {
        alert(`Edit habit ${habitId} (TODO: Implement modal/form for editing)`);
    };
    const handleDeleteHabit = async (habitId) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            // --- TODO: API Call to delete habit ---
            // await habitService.deleteHabit(authToken, habitId);
            setHabits(prev => prev.filter(h => h.id !== habitId));
            // TODO: Add toast notification
            console.log(`Habit ${habitId} deleted! (Simulated)`);
        }
    };

    if (isLoading) {
        return <PageWrapper style={{justifyContent: 'center'}}><Paragraph>Loading your dashboard...</Paragraph></PageWrapper>;
    }
    if (error) {
        return <PageWrapper style={{justifyContent: 'center'}}><Paragraph style={{color: 'red'}}>Error: {error}</Paragraph></PageWrapper>;
    }

    return (
        <PageWrapper>
            <DashboardHeader>
                <Heading1>Welcome back, {user?.name || 'User'}!</Heading1>
                <Paragraph light>Here's your progress. Keep crushing those goals!</Paragraph>
            </DashboardHeader>

            <AddHabitButton onClick={handleOpenAddHabit} variant="primary">
                {/* <FiPlusCircle style={{ marginRight: '8px' }} /> */}
                Add New Habit
            </AddHabitButton>

            <DashboardLayout>
                <MainColumn>
                    <HabitProgressChart habits={habits} />
                    <HabitList
                        habits={habits}
                        onToggleComplete={handleToggleHabitCompletion}
                        onEditHabit={handleEditHabit}
                        onDeleteHabit={handleDeleteHabit}
                    />
                </MainColumn>
                {/* <SidebarColumn> */}
                {recommendations && (
                    <RecommendationCard recommendation={recommendations} />
                )}
                {/* </SidebarColumn> */}
            </DashboardLayout>

            {/* {showAddHabitModal && <AddHabitModal onClose={() => setShowAddHabitModal(false)} onSave={handleSaveNewHabit} />} */}
        </PageWrapper>
    );
}

export default DashboardPage;