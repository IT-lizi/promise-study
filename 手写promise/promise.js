//声明构造函数
function Promise(executor) {
    // resolve函数
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    const self = this;
    //手写实现处理异步任务
    // const callback = {};
    // 实现执行多个回调
    this.callbacks = [];

    function resolve(data) {
        // 1.改变对象状态(PromiseState)
        // 2.设置对象结果值(PromiseResult)
        //判断promise是否已经被改变
        if (self.PromiseState === 'pending') {
            self.PromiseState = 'fulfilled';
            self.PromiseResult = data;
        } else return;
        //手写实现处理异步任务
        // if (self.callback.onResolved) {
        //     self.callback.onResolved(data);
        // }
        self.callbacks.forEach(item => {
            item.onResolved(data);
        });
    };
    //reject函数
    function reject(data) {
        if (self.Promise === 'pending') {
            self.PromiseState = 'rejected';
            self.PromiseResult = data;
        } else return;
        //手写实现处理异步任务
        // if (self.callback.onRejected) {
        //     self.callback.onRejected(data);
        // }
        self.callbacks.forEach(item => {
            item.onRejected(data);
        });
    };
    //处理异常情况
    try {
        //同步调用执行器函数
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
};
//添加then方法
Promise.prototype.then = function(onResolved, onRejected) {
    //调用回调函数
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    };
    if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
    //判断pending状态
    if (this.PromiseState === 'pending') {
        //手写实现处理异步任务 保存回调函数
        //this.callback={
        //     onResolved: onResolved,
        //     onRejected: onRejected
        // }
        //处理多个回调，避免覆盖问题
        this.callbacks.push({
            onResolved: onResolved,
            onRejected: onRejected
        })
    }
}