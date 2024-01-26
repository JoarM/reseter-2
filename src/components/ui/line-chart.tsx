"use client";

import React, { Fragment, useState } from "react";
import {
    CartesianGrid,
    Dot,
    Legend,
    Line,
    LineChart as ReChartsLineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import {
    ValueFormatter,
    cn,
    getYAxisDomain,
    hasOnlyOneValueForThisKey,
} from "@/lib/utils";

import {
  defaultValueFormatter,
} from "@/lib/utils";
import { CurveType } from "@/lib/utils";

type FixedProps = {
    eventType: "dot" | "category" | "bar" | "slice" | "bubble";
    categoryClicked: string;
  };
  
  type BaseEventProps = FixedProps & {
    [key: string]: number | string;
  };
  
  export type EventProps = BaseEventProps | null | undefined;

  interface BaseAnimationTimingProps {
    animationDuration?: number;
    showAnimation?: boolean;
  }
  
  interface BaseChartProps extends BaseAnimationTimingProps, React.HTMLAttributes<HTMLDivElement> {
    data: any[];
    categories: string[];
    index: string;
    valueFormatter?: ValueFormatter;
    startEndOnly?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    yAxisWidth?: number;
    showTooltip?: boolean;
    showLegend?: boolean;
    showGridLines?: boolean;
    autoMinValue?: boolean;
    minValue?: number;
    maxValue?: number;
    allowDecimals?: boolean;
    noDataText?: string;
    onValueChange?: (value: EventProps) => void;
    enableLegendSlider?: boolean;
    rotateLabelX?: {
      angle: number;
      verticalShift?: number;
      xAxisHeight?: number;
    };
  }
  
export interface LineChartProps extends BaseChartProps {
  curveType?: CurveType;
  connectNulls?: boolean;
}

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>((props, ref) => {
  const {
    data = [],
    categories = [],
    index,
    valueFormatter,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth = 56,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    autoMinValue = false,
    curveType = "linear",
    minValue,
    maxValue,
    connectNulls = false,
    allowDecimals = true,
    noDataText,
    className,
    onValueChange,
    enableLegendSlider = false,
    rotateLabelX,
    showAnimation = true,
    animationDuration = 900,
    ...other
  } = props;
  const paddingValue = !showXAxis && !showYAxis ? 0 : 20;
  const [legendHeight, setLegendHeight] = useState(60);
  const [activeDot, setActiveDot] = useState<ActiveDot | undefined>(undefined);
  const [activeLegend, setActiveLegend] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const hasOnValueChange = !!onValueChange;

  function onDotClick(itemData: any, event: React.MouseEvent) {
    event.stopPropagation();

    if (!hasOnValueChange) return;
    if (
      (itemData.index === activeDot?.index && itemData.dataKey === activeDot?.dataKey) ||
      (hasOnlyOneValueForThisKey(data, itemData.dataKey) &&
        activeLegend &&
        activeLegend === itemData.dataKey)
    ) {
      setActiveLegend(undefined);
      setActiveDot(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(itemData.dataKey);
      setActiveDot({
        index: itemData.index,
        dataKey: itemData.dataKey,
      });
      onValueChange?.({
        eventType: "dot",
        categoryClicked: itemData.dataKey,
        ...itemData.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) return;
    if (
      (dataKey === activeLegend && !activeDot) ||
      (hasOnlyOneValueForThisKey(data, dataKey) && activeDot && activeDot.dataKey === dataKey)
    ) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    } else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveDot(undefined);
  }

  return (
    <div ref={ref} className={cn("w-full h-72", className)} {...other}>
      <ResponsiveContainer className="w-full h-full">
        {data?.length ? (
          <ReChartsLineChart
            data={data}
            className="stroke-primary"
            onClick={
              hasOnValueChange && (activeLegend || activeDot)
                ? () => {
                    setActiveDot(undefined);
                    setActiveLegend(undefined);
                    onValueChange?.(null);
                  }
                : undefined
            }
          >
            {showGridLines ? (
              <CartesianGrid
                className={cn(
                  "stroke-1",
                )}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            <XAxis
              padding={{ left: paddingValue, right: paddingValue }}
              hide={!showXAxis}
              dataKey={index}
              interval="preserveStartEnd"
              tick={{ transform: "translate(0, 6)" }}
              ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
              className={cn(
                "text-muted-foreground"
              )}
              tickLine={false}
              axisLine={false}
              minTickGap={5}
              angle={rotateLabelX?.angle}
              dy={rotateLabelX?.verticalShift}
              height={rotateLabelX?.xAxisHeight}
              stroke="currentColor"
            />
            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              type="number"
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: "translate(-3, 0)" }}
              stroke="currentColor"
              className={cn(
                "text-muted-foreground"
              )}
              allowDecimals={allowDecimals}
            />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={true}
              animationDuration={150}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={
                showTooltip ? (
                  ({ payload }) => {
                    return (
                        <div className="py-2 w-44 border bg-background border-border/50 shadow-md rounded">
                            <div className="font-light text-muted-foreground border-b border-border/50 px-2 py-1">{payload?.at(0)?.payload.tooltip}</div>
                            <div className="text-muted-foreground mt-2 px-2 capitalize">{categories[0]}</div>
                            <span className="text-primary mt-1 px-2">{valueFormatter ? valueFormatter(payload?.at(0)?.value as number) : payload?.at(0)?.value}</span>
                        </div>
                    )
                  }
                    
                ) : (
                    <></>
                )
              }
              position={{ y: 0 }}
            />

            <Legend
            verticalAlign="top"
            height={4}
            content={({ payload }) =>
                <></>
            }
            />
            {categories.map((category) => (
              <Line
                className={cn(
                  "text-muted-foreground bg-primary",
                )}
                strokeOpacity={activeDot || (activeLegend && activeLegend !== category) ? 0.3 : 1}
                activeDot={(props: any) => {
                  const { cx, cy, stroke, strokeLinecap, strokeLinejoin, strokeWidth, dataKey } =
                    props;
                  return (
                    <Dot
                      className={cn(
                        onValueChange ? "cursor-pointer" : "",
                        "stroke-primary text-primary-foreground",
                      )}
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill="currentColor"
                      stroke={stroke}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeWidth={strokeWidth}
                      onClick={(dotProps: any, event) => onDotClick(props, event)}
                    />
                  );
                }}
                dot={(props: any) => {
                  const {
                    stroke,
                    strokeLinecap,
                    strokeLinejoin,
                    strokeWidth,
                    cx,
                    cy,
                    dataKey,
                    index,
                  } = props;

                  if (
                    (hasOnlyOneValueForThisKey(data, category) &&
                      !(activeDot || (activeLegend && activeLegend !== category))) ||
                    (activeDot?.index === index && activeDot?.dataKey === category)
                  ) {
                    return (
                      <Dot
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={5}
                        stroke={stroke}
                        fill=""
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        strokeWidth={strokeWidth}
                        className={cn(
                          onValueChange ? "cursor-pointer" : "",
                          "stroke-primary",
                        )}
                      />
                    );
                  }
                  return <Fragment key={index}></Fragment>;
                }}
                key={category}
                name={category}
                type={curveType}
                dataKey={category}
                stroke=""
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            ))}
            {onValueChange
              ? categories.map((category) => (
                  <Line
                    className={cn("cursor-pointer")}
                    strokeOpacity={0}
                    key={category}
                    name={category}
                    type={curveType}
                    dataKey={category}
                    stroke="transparent"
                    fill="transparent"
                    legendType="none"
                    tooltipType="none"
                    strokeWidth={12}
                    connectNulls={connectNulls}
                    onClick={(props: any, event) => {
                      event.stopPropagation();
                      const { name } = props;
                      onCategoryClick(name);
                    }}
                  />
                ))
              : null}
          </ReChartsLineChart>
        ) : (
          <span className="text-sm font-medium">No data avilable</span>
        )}
      </ResponsiveContainer>
    </div>
  );
});

LineChart.displayName = "LineChart";

export default LineChart;