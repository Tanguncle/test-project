interface RequestOptions {
    data?: any;          // 返回的数据
    delay?: number;      // 延迟时间(毫秒)
    shouldError?: boolean; // 是否模拟错误
}

export function customRequest<T>(options: RequestOptions = {}): Promise<T> {
    const {
        data = null,
        delay = 1000,
        shouldError = false
    } = options;

    return new Promise((resolve, reject) => {
        // 模拟 loading 状态
        setTimeout(() => {
            if (shouldError) {
                reject(new Error('请求失败'));
            } else {
                resolve(data);
            }
        }, delay);
    });
}
