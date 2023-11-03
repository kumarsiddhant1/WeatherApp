// Weather API Call

async function getWeather(city){
    const key = "4e243e4efbfd109c65a57b1c3000fc58";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    var res = await fetch(URL);
    var data = await res.json();
    return data;
}



//predefined 
function staticBinding() {

    icons = ["10", "20", "30", "40", "50"]
    megaCities = ["Delhi", "Tokyo", "Pune", "Seattle", "Singapore", "New York"];
    
    for (let i = 1; i<=megaCities.length; i++){

        //when homepage loads
        $(document).ready(
            function() {

            $("div.searchedTextDiv")[0].style.display = 'none'; //Element.css.property

            //Manupulating content of the cards 
            //cityname
            $("div#city"+i + "> div > h5")[0].innerHTML = megaCities[i-1];

            //remaining info
            getWeather(megaCities[i-1]).then((data) =>{
                
                d = data; 
                $("div#city"+i + "> div")[0].children[0].src = "assets/" + iconBinding(d)+ ".png"  ;
                

                $("div#city"+i + "> div > ul")[0].children[0].innerHTML ="<b>TEMP: </b> " +d.main.temp + "°C";
                $("div#city"+i + "> div > ul")[0].children[1].innerHTML = "<b>Humidity: </b>" + d.main.humidity + "%";
                $("div#city"+i + "> div > ul")[0].children[2].innerHTML = "<b>Wind Speed: </b>"+ d.wind.speed + " Kmph";
             });
        });
    }
document.getElementsByClassName("searchedTextDiv")[0].style.display = 'none'
}

staticBinding() 


//dynamic (search) 
function getVal(){
    //console.log("heyy")
    // document.getElementsByClassName("searchedTextDiv")[0].style.display = 'block';

    
    let searchedText = document.querySelector('input').value;
    getWeather(searchedText).then((data) =>{


        d=data;
        
        $("div#searchedTextCity > div ")[0].children[0].src = "assets/" + iconBinding(d) + ".png" 

        $("div.searchedTextDiv")[0].style.display = 'block';
        $("div#searchedTextCity > div> h5")[0].innerHTML = searchedText;
        
        if (d.main!= undefined){
            $("div#searchedTextCity > div> ul")[0].children[0].innerHTML = "<b>TEMP: </b> " +d.main.temp + "°C";
            $("div#searchedTextCity > div> ul")[0].children[1].innerHTML = "<b>Humidity: </b>" + d.main.humidity + "%";
            $("div#searchedTextCity > div> ul")[0].children[2].innerHTML = "<b>Wind Speed: </b>"+ d.wind.speed + " Kmph"
        }
        else{
            $("div#searchedTextCity > div> ul")[0].children[0].innerHTML = searchedText + " is not identified as a City"
            $("div#searchedTextCity > div> ul")[0].children[1].innerHTML = ""
            $("div#searchedTextCity > div> ul")[0].children[2].innerHTML = "";
        }
        })
}

function iconBinding(d){
    icons = ["10", "20", "30", "40", "50"]

    if(d.main.temp >= 41 && d.main.temp <=50){
        return 50;
    }
    if(d.main.temp >= 31 && d.main.temp <=40){
        return 40
    }
    if(d.main.temp >= 21 && d.main.temp <=30){
        return 30
    }
    if(d.main.temp >= 11 && d.main.temp <=20){
        return 20
    }
    if(d.main.temp <=11){
        return 10
    }

}



