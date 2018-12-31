function deparam (uri) {
    if (uri === undefined) {
        uri = window.location.search
    }
    let searchParams = new URLSearchParams(uri);
    let name = searchParams.get("name")
    let room = searchParams.get("room")
    return{
        name,
        room
    }
}