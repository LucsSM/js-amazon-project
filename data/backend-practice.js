const xml = new XMLHttpRequest();

xml.addEventListener('load', () => {
    console.log(xml.response);
});

xml.open('GET', 'https://supersimplebackend.dev');
xml.send();
