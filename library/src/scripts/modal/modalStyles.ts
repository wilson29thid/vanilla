/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { vanillaHeaderVariables } from "@library/headers/vanillaHeaderStyles";
import { layoutVariables } from "@library/layout/layoutStyles";
import { globalVariables } from "@library/styles/globalStyleVars";
import { shadowHelper } from "@library/styles/shadowHelpers";
import { borders, colorOut, fullSizeOfParent, margins, sticky, unit } from "@library/styles/styleHelpers";
import { styleFactory, useThemeCache, variableFactory } from "@library/styles/styleUtils";
import { calc, percent, translate, translateX, viewHeight } from "csx";

export const modalVariables = useThemeCache(() => {
    const globalVars = globalVariables();
    const makeThemeVars = variableFactory("modal");

    const { elementaryColors } = globalVars;

    const colors = makeThemeVars("colors", {
        fg: globalVars.mainColors.fg,
        bg: globalVars.mainColors.bg,
        overlayBg:
            globalVars.mainColors.fg.lightness() > 0.5
                ? elementaryColors.white.fade(0.4)
                : elementaryColors.black.fade(0.4),
    });

    const sizing = makeThemeVars("sizing", {
        large: 720,
        medium: 516,
        small: 375,
    });

    const spacing = makeThemeVars("spacing", {
        horizontalMargin: 16,
    });

    const border = makeThemeVars("border", {
        radius: globalVars.border.radius,
    });

    const dropDown = makeThemeVars("dropDown", {
        padding: globalVars.spacer.size,
    });

    const header = makeThemeVars("header", {
        minHeight: 60,
        verticalPadding: 12,
        boxShadow: `0 1px 2px 0 ${colorOut(globalVars.overlay.bg)}`,
    });

    const footer = makeThemeVars("footer", {
        minHeight: header.minHeight,
        verticalPadding: header.verticalPadding,
        boxShadow: `0 -1px 2px 0 ${colorOut(globalVars.overlay.bg)}`,
    });

    return {
        colors,
        sizing,
        spacing,
        border,
        dropDown,
        header,
        footer,
    };
});

export const modalClasses = useThemeCache(() => {
    const globalVars = globalVariables();
    const vars = modalVariables();
    const style = styleFactory("modal");
    const mediaQueries = layoutVariables().mediaQueries();
    const shadows = shadowHelper();
    const headerVars = vanillaHeaderVariables();

    const overlay = style("overlay", {
        position: "absolute",
        height: percent(100),
        width: percent(100),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: colorOut(vars.colors.overlayBg),
        zIndex: 10,
    });

    const root = style({
        display: "block",
        left: percent(50),
        width: percent(100),
        maxWidth: percent(100),
        maxHeight: viewHeight(80),
        zIndex: 1,
        backgroundColor: colorOut(vars.colors.bg),
        position: "fixed",
        top: percent(50),
        right: 0,
        bottom: "initial",
        overflow: "hidden",
        transform: translate(`-50%`, `-50%`),
        ...margins({ all: "auto" }),

        $nest: {
            "&&.isFullScreen": {
                width: percent(100),
                height: percent(100),
                maxHeight: percent(100),
                maxWidth: percent(100),
                borderRadius: 0,
                border: "none",
                top: 0,
                bottom: 0,
                transform: "none",
                left: 0,
                right: 0,
            },
            "&.isLarge": {
                width: unit(vars.sizing.large),
                maxWidth: calc(`100% - ${unit(vars.spacing.horizontalMargin * 2)}`),
            },
            "&.isMedium": {
                width: unit(vars.sizing.medium),
                maxWidth: calc(`100% - ${unit(vars.spacing.horizontalMargin * 2)}`),
            },
            "&.isSmall": {
                width: unit(vars.sizing.small),
                maxWidth: calc(`100% - ${unit(vars.spacing.horizontalMargin * 2)}`),
            },
            "&&&.isSidePanel": {
                left: unit(vars.dropDown.padding),
                width: calc(`100% - ${vars.dropDown.padding}px`),
                display: "flex",
                flexDirection: "column",
                top: 0,
                bottom: 0,
                transform: "none",
            },
            "&&.isDropDown": {
                top: 0,
                bottom: globalVars.gutter.size,
                overflow: "auto",
                width: percent(100),
                marginBottom: "auto",
                transform: translateX(`-50%`),
                maxHeight: percent(100),
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            },
            "&.isShadowed": {
                ...shadows.dropDown(),
                ...borders(),
            },
        },
    });

    const scroll = style(
        "scroll",
        {
            overflow: "auto",
        },
        fullSizeOfParent(),
    );

    const content = style("content", shadows.modal());

    const pageHeader = style(
        "pageHeader",
        sticky(),
        {
            ...shadows.embed(),
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: unit(headerVars.sizing.height),
            minHeight: unit(headerVars.sizing.height),
            zIndex: 2,
            background: colorOut(vars.colors.bg),
            $nest: {
                "&.noShadow": {
                    boxShadow: "none",
                },
            },
        },
        mediaQueries.oneColumn({
            minHeight: unit(headerVars.sizing.mobile.height),
        }),
    );

    return {
        root,
        content,
        pageHeader,
        overlay,
        scroll,
    };
});
