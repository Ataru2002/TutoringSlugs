import { React, useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sarah from '../assests/sarah.jpg';
import defaultProfilePhoto from '../assests/default.jpg'
import DynamicBox from '../components/DynamicBox';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const origin_url = window.location.origin;

const sections = [
    { title: 'Wanna be a tutor?', url: origin_url + '/tutor_signup' },
    { title: 'Change your setting', url: origin_url + '/change_setting' },
    { title: 'Change your tutor setting', url: origin_url + '/change_tutor_setting' },
];

function goSearch() {
    window.location.href = "/search";
}

const db = getFirestore();
let q = query(collection(db, "Users"), where("tutor", "==", true));
let tutors = [];
await getDocs(q).then(async function(snapshot){
    let temp = []

    for await(var doc of snapshot.docs){
        //const {loading, err, image} = useImage(doc.id + ".jpg");

        try{
            const image = await import(`../assests/profiles/${doc.id}.jpg`);
            temp.push({profilePhoto: image.default, ...doc.data() });
        }
        catch(err){
            temp.push({profilePhoto: defaultProfilePhoto, ...doc.data()});
        }
    }

    temp.map((obj) => {
        tutors.push(obj);
    });
});

export default function Results() {
    const [filteredTutors, setFilteredTutors] = useState([]);

    useEffect(() => {
        let courses = [];
        let url = window.location.href;
        let hashes = url.split("?")[1];
        let hash = hashes.split('&');
        hash.forEach((space) => {
            let revamp = space.replace("class[]=", "");
            courses.push(revamp.replace("%20", " "));
        });

        tutors.forEach((tutor) => {
            courses.forEach((course) => {
                if ("coursesTutored" in tutor && tutor.coursesTutored.includes(course) && !filteredTutors.includes(tutor)){
                    setFilteredTutors( (filteredTutors) => {
                        return [
                            ...filteredTutors,
                            tutor
                        ];
                    });
                }
            });
        });
    }, []);

    return (
        <Container>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Tutoring Slugs" sections={sections} />
                <main>
                    <Grid container
                        spacing={6}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item container
                            spacing={6}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item >
                                <Button variant="contained" onClick={() => goSearch()}>
                                    Home
                                </Button>
                            </Grid>
                        </Grid>
                        {
                        filteredTutors.map((tutor) => (
                            <DynamicBox image={tutor.profilePhoto} name={tutor.firstName + " " + tutor.lastName}
                                description={tutor.description} email={tutor.email} />
                        ))}
                    </Grid>
                </main>
            </Container>
            <Footer
                title="Tutoring Slugs | University of California, Santa Cruz | Support TutoringSlugsSupport@gmail.com"
                description="Please fund us"
            />
        </Container>
    );
}