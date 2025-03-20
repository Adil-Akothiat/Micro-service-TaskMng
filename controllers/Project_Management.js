const { request, response, Router } = require("express");
const { errorHandler } = require("../errorHandler/error");
const projects = require("../models/ProjectModel");
const welcom = (request, response) =>
  errorHandler(async () => {
    response.send("welcom to project route :)");
  })(request, response);

const read = (request, response) =>
  errorHandler(async () => {
    const find_all = await projects.find();
    response.status(200).send(find_all);
  })(request, response);

const create = (request, response) =>
  errorHandler(async () => {
    const { nom, description, date_debut, date_fin, status, category_id } =
      request.body;
    if (
      !nom ||
      !description ||
      !date_debut ||
      !date_fin ||
      !status ||
      !category_id
    ) {
      return response
        .status(400)
        .json({ message: "please fill all the fields" });
    }
    const new_project = await projects.insertOne({
      nom: nom,
      description: description,
      date_debut: date_debut,
      date_fin: date_fin,
      status: status,
      category_id: category_id,
    });

    response
      .status(201)
      .json({ message: "project added successufly :)", project: new_project });
  })(request, response);

const update = (request, response) =>
  errorHandler(async () => {
    const { nom, description, date_debut, date_fin, status, category_id } =
      request.body;
    const project_id = request.params.id;
    if (
      !nom ||
      !description ||
      !date_debut ||
      !date_fin ||
      !status ||
      !category_id
    ) {
      return response
        .status(400)
        .json({ message: "please fill all the fields" });
    }
    if (!project_id) {
      return response.status(400).json({ message: "project not found 🤷‍♂️" });
    }

    const update_project = await projects.updateOne(
      {
        _id: request.params.id,
      },
      {
        $set: {
          nom: nom,
          description: description,
          date_debut: date_debut,
          date_fin: date_fin,
          status: status,
          category_id: category_id,
        },
      }
    );

    response
      .status(200)
      .json({
        message: "project updated successufly :)",
        project: update_project,
      });
  })(request, response);

const supprimer = (request, response) =>
  errorHandler(async () => {
    const project_id = request.params.id;
    if(!project_id)
    {
      return response.status(400).json({message : "project not found 🤷‍♂️"})
    }
    const delete_project = await projects.deleteOne(
      {
        _id : project_id
      }
    )
    response.status(200).json({message : 'project deleted successufly :)' , project : delete_project})
  })(request, response);


const search = (request , response) => errorHandler(async ()=>
{
const {nom , date_debut , date_fin , status} = request.query
const filter = {}
if(nom)
{
  filter.nom = nom
}

if(status)
{
  filter.status = status
}
if(date_debut)
{
  filter.date_debut = {$gte : date_debut}
}
if(date_fin)
{
  filter.date_fin = {$lte : date_fin}
}

const searching = await projects.find(filter)
response.send(searching)
})(request,response)

module.exports = {
  welcom,
  read,
  create,
  update,
  supprimer,
  search
};
