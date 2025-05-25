// src/components/dashboard/HabitProgressChart.js
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import { Heading3, Paragraph } from '../common/Typography';
import Card from '../common/Card';
import { useTheme } from '../../contexts/ThemeContext'; // Use your updated

const ChartCard = styled(Card)`
  padding: 25px;
`;

const ChartTitle = styled(Heading3)`
  text-align: center;
  margin-bottom: 25px;
`;

const EmptyChartState = styled(Paragraph)`
  text-align: center;
  padding: 20px;
  color: ${({theme}) => theme.textLighter};
`;

const generateWeeklyData = (habits) => {
    // ... (same as before)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        name: day,
        completed: Math.floor(Math.random() * (habits.length + 1)),
        total: habits.length,
    }));
};

function HabitProgressChart({ habits }) {
    const theme = useTheme(); // Get the full theme object

    const weeklyData = useMemo(() => generateWeeklyData(habits), [habits]);

    const overallCompletionData = useMemo(() => {
        if (!habits || habits.length === 0) return [{ name: 'No Habits', value: 100, fill: theme.border }]; // Add fill here
        const completedCount = habits.filter(h => h.completedToday).length;
        const pendingCount = habits.length - completedCount;
        return [
            { name: 'Completed Today', value: completedCount, fill: theme.accent },
            { name: 'Pending Today', value: pendingCount, fill: theme.border }, // Or a specific pending color
        ];
    }, [habits, theme]);

    // Define colors directly using the theme object
    const barFillColor = theme.chartPrimary;
    const gridStrokeColor = theme.chartGrid;
    const axisStrokeColor = theme.textLighter;
    const tooltipBackgroundColor = theme.surface;
    const tooltipBorderColor = theme.border;
    const tooltipTextColor = theme.text;
    const legendTextColor = theme.textLighter;


    if (!habits || habits.length === 0) {
        return (
            <ChartCard>
                <ChartTitle>Habit Progress</ChartTitle>
                <EmptyChartState>Add some habits to see your progress visualized here!</EmptyChartState>
            </ChartCard>
        )
    }

    return (
        <ChartCard>
            <ChartTitle>Weekly Overview (Sample)</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                    <XAxis dataKey="name" stroke={axisStrokeColor} />
                    <YAxis stroke={axisStrokeColor} allowDecimals={false}/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBackgroundColor,
                            borderColor: tooltipBorderColor,
                            color: tooltipTextColor
                        }}
                    />
                    <Legend wrapperStyle={{color: legendTextColor}}/>
                    <Bar dataKey="completed" fill={barFillColor} name="Habits Completed" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            <ChartTitle style={{marginTop: '40px'}}>Today's Snapshot</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={overallCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        // fill prop on Pie is a default, Cell overrides it
                        dataKey="value"
                        label={({ name, value, percent }) => value > 0 ? `${name}: ${value} (${(percent * 100).toFixed(0)}%)` : null}
                    >
                        {overallCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} /> // Use fill from data object
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBackgroundColor,
                            borderColor: tooltipBorderColor,
                            color: tooltipTextColor
                        }}
                    />
                    <Legend wrapperStyle={{color: legendTextColor}}/>
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

export default HabitProgressChart;
