import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { palette } from "./palette";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  badge?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, style, badge }) => {
  return (
    <View style={[styles.card, style]}>
      {badge && badge}
      {children}
    </View>
  );
};

interface CardBadgeProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ children, style }) => (
  <View style={[styles.badge, style]}>{children}</View>
);

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
}) => <View style={[styles.content, style]}>{children}</View>;

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  badge: {
    position: "absolute",
    top: -10,
    left: 16,
    backgroundColor: palette.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  content: {
    marginTop: 16,
  },
  footer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
});
