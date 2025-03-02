import React from 'react';
import { View, StyleSheet } from 'react-native';

const GrowingTimeline = ({ growingInfo, months = 12 }) => {
    // Render timeline bars for each activity type
    const renderTimeline = () => {
        const timeline = [];
        const activities = [
            { type: 'startIndoor', months: growingInfo.startIndoorMonths, color: '#E91E63' },
            { type: 'transplant', months: growingInfo.transplantMonths, color: '#FF9800' },
            { type: 'sowOutdoor', months: growingInfo.sowOutdoorMonths, color: '#9C27B0' },
            { type: 'harvest', months: growingInfo.harvestMonths, color: '#009688' }
        ];

        // Create bars for each month and activity
        activities.forEach(activity => {
            if (activity.months && activity.months.length > 0) {
                // Create segments for consecutive months
                let segments = [];
                let currentSegment = { start: null, end: null };

                activity.months.sort((a, b) => a - b).forEach((month, index, array) => {
                    if (currentSegment.start === null) {
                        currentSegment.start = month;
                        currentSegment.end = month;
                    } else if (month === currentSegment.end + 1) {
                        currentSegment.end = month;
                    } else {
                        segments.push({ ...currentSegment });
                        currentSegment = { start: month, end: month };
                    }

                    // Add the last segment
                    if (index === array.length - 1) {
                        segments.push({ ...currentSegment });
                    }
                });

                // Render each segment as a colored bar
                segments.forEach(segment => {
                    const startPosition = (segment.start / months) * 100;
                    const width = ((segment.end - segment.start + 1) / months) * 100;

                    timeline.push(
                        <View
                            key={`${activity.type}-${segment.start}-${segment.end}`}
                            style={[
                                styles.timelineBar,
                                {
                                    backgroundColor: activity.color,
                                    left: `${startPosition}%`,
                                    width: `${width}%`,
                                }
                            ]}
                        />
                    );
                });
            }
        });

        return timeline;
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeline}>
                {renderTimeline()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    timeline: {
        height: 20,
        backgroundColor: '#333',
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
    },
    timelineBar: {
        height: '100%',
        position: 'absolute',
        borderRadius: 4,
    },
});

export default GrowingTimeline;