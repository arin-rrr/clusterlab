from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import users, fields

app = FastAPI(
    title='ClusterLab',
    version='0.1.0'
)

app.include_router(users.router)
app.include_router(fields.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "https://clusterlab.vercel.app/",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'message': 'Welcome to ClusterLab'}
