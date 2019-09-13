export default {
    'external-currentTime': (payload, preventDefault) => {
        return new Promise(async (resolve) => {
            preventDefault()
            const date = new Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: 'numeric',
            }).format(new Date())
            resolve(date)
        })
    }
}