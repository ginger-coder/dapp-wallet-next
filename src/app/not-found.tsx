import Link from "next/link";

const PageNotFoundView = () => {

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-9xl font-bold text-gray-900">404</h1>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        页面未找到
                    </h2>

                    <p className="text-gray-600 mb-8">
                        抱歉，您请求的页面不存在或已被移除。
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 rounded-md 
                       bg-gray-900 text-white hover:bg-gray-800 
                       transition-colors duration-200"
                        >
                            返回上页
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 rounded-md 
                       border border-gray-300 text-gray-700 
                       hover:bg-gray-50 transition-colors duration-200"
                        >
                            返回首页
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFoundView;
