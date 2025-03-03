import type { NextConfig } from "next";
import { resolve } from "path";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: true, // 自动在浏览器中打开分析报告
    analyzerMode: "static", // 生成静态报告文件
    analyzerPort: 8888, // 设置服务器端口
    generateStatsFile: true, // 是否生成 stats 文件
    statsFilename: "stats.json", // stats 文件名
});

module.exports = withBundleAnalyzer({
    experimental: {
        turbo: {
            "@components": resolve("src/components"),
            "@hooks": resolve("src/hooks"),
            "@pages": resolve("src/pages"),
            "@layouts": resolve("src/layouts"),
            "@assets": resolve("src/assets"),
            "@states": resolve("src/states"),
            "@service": resolve("src/service"),
            "@utils": resolve("src/utils"),
            "@lib": resolve("src/lib"),
            "@constants": resolve("src/constants"),
            "@connectors": resolve("src/connectors"),
            "@abis": resolve("src/abis"),
            "@types": resolve("src/types"),
            "@routes": resolve("src/routes"),
        },
    },
    // 其他 Next.js 配置
    webpack: (config, { isServer }) => {
        // 优化 wagmi 和 connectkit 的打包
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                chunks: "all",
                minSize: 20000,
                maxSize: 244000,
                cacheGroups: {
                    web3: {
                        test: /[\\/]node_modules[\\/](wagmi|connectkit)[\\/]/,
                        name: "web3-vendors",
                        chunks: "all",
                    },
                },
            },
        };
        return config;
    },
} as NextConfig);
