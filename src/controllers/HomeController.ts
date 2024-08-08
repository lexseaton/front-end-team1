/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { countFilterCapTotalJobs, countFilterTotalJobs, countTotalJobs, countJobRoleName } from "../services/JobRoleService";
import { Locations } from "../models/Locations";
import { Capabilities } from "../models/Capabilities";

const baseURL = process.env.AWS_URL || 'http://localhost:3000';
let location = Locations.Belfast;
let capability = Capabilities.Delivery;

export const getHomepage = async (req: express.Request, res: express.Response): Promise<void> => {
    const totalJobs = await getTotalNumberOfJobs(req, res);
    const totalFilteredJobs = await getTotalFilteredNumberOfJobs(req, res);
    const totalFilteredCapJobs = await getTotalFilteredCapNumberOfJobs(req, res);
    const mostFrequentJRName = await getMostFrequentJobRoleName(req, res);
    if (totalFilteredJobs != null || totalFilteredJobs == 0 || totalFilteredCapJobs != null || totalFilteredCapJobs == 0) {
        res.render('homepage.html', { ...req.body, baseURL, locationList, capabilitiesList, totalJobs, totalFilteredJobs, totalFilteredCapJobs, mostFrequentJRName });
    } else {
        res.render('homepage.html', { ...req.body, baseURL, locationList, capabilitiesList, totalJobs, mostFrequentJRName });
    }
}

export const getTotalNumberOfJobs = async (req: express.Request, res: express.Response): Promise<number> => {
    try {
        const totalOpenJobs = await countTotalJobs();
        return totalOpenJobs;
    } catch (e) {
        res.locals.errormessage = e.message;
    }
}

export const getTotalFilteredNumberOfJobs = async (req: express.Request, res: express.Response): Promise<number> => {
    try {
        location = req.query.location as Locations;
        if (location == null) {
            return null;
        }
        const totalFilteredOpenJobs = await countFilterTotalJobs(location);
        console.log(req.body.location);
        return totalFilteredOpenJobs;
    } catch (e) {
        res.locals.errormessage = e.message;
    }
}

export const getTotalFilteredCapNumberOfJobs = async (req: express.Request, res: express.Response): Promise<number> => {
    try {
        capability = req.query.capability as Capabilities;
        if (capability == null) {
            return null;
        }
        const totalFilteredCapOpenJobs = await countFilterCapTotalJobs(capability);
        console.log(req.body);
        return totalFilteredCapOpenJobs;
    } catch (e) {
        res.locals.errormessage = e.message;
    }
}

export const getMostFrequentJobRoleName = async (req: express.Request, res: express.Response): Promise<string> => {
    try {
        const mostFrequentJobRole = await countJobRoleName();
        return mostFrequentJobRole;
    } catch (e) {
        res.locals.errormessage = e.message;
    }
}

const capabilitiesList = Object.keys(Capabilities).map(key => ({
    value: Capabilities[key as keyof typeof Capabilities],
    label: key
}));  

const locationList = Object.keys(Locations).map(key => ({
    value: Locations[key as keyof typeof Locations],
    label: key
}));  

    res.render('homepage.html', { baseURL });
}
