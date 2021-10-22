const download = () =>{
    axios({
        url: 'https://picsum.photos/450/300',
        method:'GET',
        responseType:'blob'
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        console.log(url)
        const link = document.createElement('a')

        link.href = url

        link.setAttribute('download','image.jpg')

        document.body.appendChild(link)

        link.click()
    })
}